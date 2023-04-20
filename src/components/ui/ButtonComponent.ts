import { useState, useEffect } from "react";
import {
  Stage,
  AnimatedSprite,
  Container,
  Sprite,
  PixiComponent
} from "@pixi/react";
import {
  Assets,
  Texture,
  Graphics,
  Text
} from "pixi.js";
import {
  Button,
  FancyButton,
} from '@pixi/ui'

export const ButtonComponent = PixiComponent('ButtonComponent', {
  create: () => new FancyButton({
    defaultView: './assets/ui/Button.png',
    hoverView: `./assets/ui/Button_hover.png`,
    pressedView: `./assets/ui/Button_pressed.png`,
    text: new Text('Click me!'),
    animations: {
         hover: {
             props: {
                 scale: {
                     x: 1.1,
                     y: 1.1,
                 }
             },
             duration: 100,
         },
         pressed: {
             props: {
                 scale: {
                     x: 0.9,
                     y: 0.9,
                 }
             },
             duration: 100,
         }
    }
  }),
  // applyProps: (props) => {...props}
});