import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export default function TasksIcon({ size, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M9 12l2 2 4-4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
