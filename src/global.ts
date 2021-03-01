import 'normalize.css';

import { CustomWindow } from './interfaces/common';

// 初始主题设置：dark | light
((global as unknown) as CustomWindow).chartConfig = {
  theme: 'light',
  themeConfig: {
    light: {
      colors10: [
        'red',
        'yellow',
        'blue',
        '#9FB40F',
        '#76523B',
        '#DAD5B5',
        '#0E8E89',
        '#E19348',
        '#F383A2',
        '#247FEA',
      ],
      defaultColor: 'red',
    },
    dark: {
      colors10: [
        'green',
        'cyan',
        'purple',
        '#9FB40F',
        '#76523B',
        '#DAD5B5',
        '#0E8E89',
        '#E19348',
        '#F383A2',
        '#247FEA',
      ],
      defaultColor: 'yellow',
    },
  },
};
