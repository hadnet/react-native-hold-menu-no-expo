import React from 'react';
import {StyleSheet} from 'react-native';

import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  calculateMenuHeight,
  menuAnimationAnchor,
} from '../../utils/calculations';
import {BlurView} from '@react-native-community/blur';

import MenuItems from './MenuItems';

import {
  SPRING_CONFIGURATION_MENU,
  HOLD_ITEM_TRANSFORM_DURATION,
  IS_IOS,
  CONTEXT_MENU_STATE,
} from '../../constants';

import {useInternal} from '../../hooks';
import {deepEqual} from '../../utils/validations';
import {leftOrRight} from './calculations';
import styles from './styles';
import type {MenuItemProps} from './types';

const AnimatedView = Animated.createAnimatedComponent(BlurView);

const MenuListComponent = () => {
  const {state, theme, menuProps, menuBgColors} = useInternal();

  const [itemList, setItemList] = React.useState<MenuItemProps[]>([]);
  const [isVisible, setIsVisible] = React.useState<boolean>(state.value === CONTEXT_MENU_STATE.ACTIVE);

  const menuHeight = useDerivedValue(() => {
    const itemsWithSeparator = menuProps.value.items.filter(
      item => item.withSeparator
    );
    return calculateMenuHeight(
      menuProps.value.items.length,
      itemsWithSeparator.length
    );
  }, [menuProps]);
  const prevList = useSharedValue<MenuItemProps[]>([]);

  const messageStyles = useAnimatedStyle(() => {
    const itemsWithSeparator = menuProps.value.items.filter(
      item => item.withSeparator
    );

    const translate = menuAnimationAnchor(
      menuProps.value.anchorPosition,
      menuProps.value.itemWidth,
      menuProps.value.items.length,
      itemsWithSeparator.length
    );

    const _leftPosition = leftOrRight(menuProps);
    const isMenuActive = state.value === CONTEXT_MENU_STATE.ACTIVE

    const menuScaleAnimation = () =>
      isMenuActive
        ? withSpring(1, SPRING_CONFIGURATION_MENU)
        : withTiming(0, {
          duration: HOLD_ITEM_TRANSFORM_DURATION,
        }, finished => {
          if (finished && !isMenuActive)
            runOnJS(setIsVisible)(false)
        });

    const opacityAnimation = () =>
      withTiming(isMenuActive ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      });

    return {
      left: _leftPosition,
      height: menuHeight.value,
      opacity: opacityAnimation(),
      transform: [
        {translateX: translate.beginningTransformations.translateX},
        {translateY: translate.beginningTransformations.translateY},
        {
          scale: menuScaleAnimation(),
        },
        {translateX: translate.endingTransformations.translateX},
        {translateY: translate.endingTransformations.translateY},
      ],
    };
  });

  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme.value === 'light'
          ? IS_IOS
            ? menuBgColors?.light ?? 'rgba(255, 255, 255, .75)'
            : menuBgColors?.light ?? 'rgba(255, 255, 255, .95)'
          : IS_IOS
          ? menuBgColors?.dark ?? 'rgba(0,0,0,0.5)'
          : menuBgColors?.dark ?? 'rgba(39, 39, 39, .8)',
    };
  }, [theme]);

  const animatedProps = useAnimatedProps(() => {
    return {blurType: theme.value};
  }, [theme]);

  const setter = (items: MenuItemProps[]) => {
    setItemList(items);
    prevList.value = items;
  };

  useAnimatedReaction(
    () => state.value === CONTEXT_MENU_STATE.ACTIVE,
    isMenuActive => {
      if (isMenuActive)
        runOnJS(setIsVisible)(true)
    },
    [state]
  )

  useAnimatedReaction(
    () => menuProps.value.items,
    _items => {
      if (!deepEqual(_items, prevList.value)) {
        runOnJS(setter)(_items);
      }
    },
    [menuProps]
  );

  if (!isVisible)
    return null

  return (
    <Animated.View style={[styles.menuContainer, messageStyles]}>
      <AnimatedView
        intensity={100}
        animatedProps={animatedProps}
        style={StyleSheet.absoluteFillObject}
      >
           <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.menuInnerContainer,
            animatedInnerContainerStyle,
          ]}
        >
          <MenuItems items={itemList} />
        </Animated.View>
      </AnimatedView>
    </Animated.View>
    // <AnimatedView
    //   blurAmount={100}
    //   animatedProps={animatedProps}
    //   style={[styles.menuContainer, messageStyles]}>
    //   <Animated.View
    //     style={[
    //       StyleSheet.absoluteFillObject,
    //       styles.menuInnerContainer,
    //       animatedInnerContainerStyle,
    //     ]}>
    //     <MenuItems items={itemList} />
    //   </Animated.View>
    // </AnimatedView>
  );
};

const MenuList = React.memo(MenuListComponent);

export default MenuList;
