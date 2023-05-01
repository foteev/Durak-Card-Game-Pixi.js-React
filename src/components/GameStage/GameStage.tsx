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
import * as PIXI from 'pixi.js';
import { proxy, subscribe, useSnapshot } from 'valtio';
import '@pixi/events';
import {
  TypeCard,
  TypePlacedCard,
  TypeGameStatus,
  TypeGameStore
} from "../../types/types";
import {
  Button,
  FancyButton,
  ButtonContainer
} from '@pixi/ui'
import { gameStore } from "../store/gameStore";
import './GameStage.css'
import { playerMove, checkIfAvailable } from '../utils/utils';

const width = window.innerWidth
const height = window.innerHeight
const cardWidth = width / 10;
const cardHeight = 88/63 * cardWidth;
const cardGap = cardWidth * 0.8
const coefficient = 30;

const options = {
  backgroundColor: 0xFFFFFF,
  resolution: window.devicePixelRatio,
  backgroundAlpha: 0,
  autoResize: true,
};
const style = {
  width: width,
  height: height,
};

type Props = {
  playerIndex: number
}

export const GameStage  = (props: Props) => {

  const playerIndex = props.playerIndex;
  const snap = useSnapshot(gameStore) as TypeGameStore;
  const handlePlayerClick = (target: any) => {
    playerMove(playerIndex, target);
  }
  const filter = new PIXI.filters.ColorMatrixFilter

  // gameStore.placedCards.unshift(gameStore.placedCards.pop()!);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight - 48} className='game-stage' options={options} style={style}>
      <ContainerWithName
      name={'DeckContainer'}
        x={30}
        y={height / 2 - cardHeight / 2}
      >
        {snap.deckCards?.map((card: TypeCard, index, array) => {
          
          const cardTexture = Texture.from('./assets/cards/backR.png');
          if (index === array.length - 1) {
            const cardPath: string = `./assets/cards/${card.suit.slice(0, 1).concat(card.rank.toString())}.png`;
            return <CardComponent
            key={card.name}
            name={card.name}
            rotation={1.55}
            // anchor={[-0.5,0.1]}
            x={cardHeight}
            y={cardWidth / 5}
            width={cardWidth}
            height={cardHeight}
            texture={Texture.from(cardPath)}
            eventMode={'static'}
          />
          }
          return <CardComponent
            key={card.name}
            name={card.name}
            anchor={0}
            x={0 + index}
            y={0}
            width={cardWidth}
            height={cardHeight}
            texture={cardTexture}
            eventMode={'static'}
          />
        })}
      </ContainerWithName>
      <ContainerWithName
        name={"Player2Container"}
        x={width / 2 - width / snap.players[playerIndex === 0 ? 1 : 0].cards.length / 2}
        y={50}
      >
        {snap.players
        .filter((player, index) => index !== playerIndex)[0]
        .cards
        .map((card: TypeCard, index) => {
          const cardPath: string = `./assets/cards/${card.suit.slice(0, 1).concat(card.rank.toString())}.png`;
          const cardTexture = Texture.from(cardPath);

          return <CardComponent
            key={card.name}
            name={card.name}
            anchor={0}
            x={0 + index*coefficient}
            y={0}
            width={cardWidth}
            height={cardHeight}
            texture={cardTexture}
            eventMode={'static'}
          />
        })}
      </ContainerWithName>
      <ContainerWithName
        name={"PlacedCardsContainer"}
        x={width / 2 - width / snap.players[1].cards.length / 2}
        y={height / 3 + width / 30}
      >
        {snap.placedCards.map((cardsPair: TypePlacedCard, index) => {
          const cardAttacker = cardsPair.attacker as TypeCard,
                cardDefender = cardsPair.defender ? cardsPair.defender : null;
          const cardAttackerPath: string = `./assets/cards/${cardAttacker.suit.slice(0, 1).concat(cardAttacker.rank.toString())}.png`;
          const cardAttackerTexture = Texture.from(cardAttackerPath);

          let cardDefenderPath: string = `./assets/cards/backR.png`;
          let cardDefenderTexture = Texture.from(cardDefenderPath);

          if (cardDefender) {
            cardDefenderPath = `./assets/cards/${cardDefender.suit.slice(0, 1).concat(cardDefender.rank.toString())}.png`;
            cardDefenderTexture = Texture.from(cardDefenderPath);
          }

          return <>
            <CardComponent
              key={cardAttacker.name}
              name={cardAttacker.name}
              anchor={0.2}
              rotation={Math.random()/10}
              x={0 + index*coefficient * 4}
              y={0 + cardHeight / 4 }
              width={cardWidth}
              height={cardHeight}
              texture={cardAttackerTexture}
            />
            {cardDefender ? (
              <CardComponent
              key={cardDefender.name}
              name={cardDefender.name}
              anchor={-0.3}
              rotation={Math.random()/10}
              x={0 + index*coefficient * 4}
              y={0}
              width={cardWidth}
              height={cardHeight}
              texture={cardDefenderTexture}
            />
            ) : null }
          </>
        })}
      </ContainerWithName>
      <ContainerWithName
        name={"Player1Container"}
        x={snap.players[playerIndex].cards.length < 12 ? (width / 2 - snap.players[playerIndex].cards.length * cardGap / 2)
          : (width / 2 - snap.players[playerIndex].cards.length * cardGap / 4)}
        y={height - cardHeight - 70}
      >
        {snap.players[playerIndex].cards.map((card: TypeCard, index, array) => {
          const cardPath: string = `./assets/cards/${card.suit.slice(0, 1).concat(card.rank.toString())}.png`;
          const cardTexture = Texture.from(cardPath);

          return <CardComponent
            key={card.name}
            name={card.name}
            x={array.length < 12 ? index*cardGap : index*cardGap / 2}
            y={0}
            width={array.length < 12 ? cardWidth : 2* cardWidth / 3}
            height={array.length < 12 ? cardHeight : 2* cardHeight / 3}
            texture={cardTexture}
            tint={checkIfAvailable(playerIndex, card) ? '0xFFFFFF' : '0x505050'}
            eventMode={'static'}
            click={(event: Event) => {
              handlePlayerClick(event.target)
            }}
          />
        })}
      </ContainerWithName>
    </Stage>
  );
}

export const CardComponent = (props: any) => <Sprite {...props} />;

const ContainerWithName = (props: any) => <Container {...props} />;




// const spritesheetUrl =
//   "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";

// const ButtonComponent = PixiComponent('ButtonComponent', {
//   create: () => new ButtonContainer(
//     new Graphics()
//         .beginFill(0xFFFFFF)
//         .drawRoundedRect(0, 0, 100, 50, 15)
// ),
//   // applyProps: (props) => {...props}
// });

      {/* <AnimatedSprite
        initialFrame={0}
        isPlaying={true}
        position={[300,75]} // changed to a Point tuple
        // textures={Object.values(textures)}
        interactive={true}
        // pointerdown={toggleAnimation} */}
      {/* /> */}
            {/* <ContainerWithName
        name={"ButtonsContainer"}
      > */}
        {/* <ButtonComponent
          x={100}
          y={100}
          click={handleClick}
          // width={100}
        /> */}
      {/* </ContainerWithName> */}

  // useEffect(() => {
  //   function loadSprite() {
  //     Assets
  //       .load(spritesheetUrl)
  //       .then((sheet) => {
  //         setTextures(sheet.textures);
  //       })
  //       .catch((err) => {
  //         console.error('[Game][useEffect] err %o loading sheet', err)
  //       })
  //   }

    // loadSprite()

  //   return () => {
  //     console.log("Some sort of cleanup here")
  //   }
  // }, []);

  // console.log('[Game] textures', textures)

  // if (!textures) {
  //   return null;
  // }
