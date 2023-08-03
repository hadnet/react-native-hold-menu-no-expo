import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-hold-menu-no-expo' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type HoldMenuNoExpoProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'HoldMenuNoExpoView';

export const HoldMenuNoExpoView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<HoldMenuNoExpoProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
