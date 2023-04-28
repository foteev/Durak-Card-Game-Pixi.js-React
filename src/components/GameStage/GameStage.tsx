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

const width = 1280
const height = 600

const options = {
  backgroundColor: '#8F754F',
  resolution: window.devicePixelRatio,
  width: width,
  height: height,
  backGroundAlpha: 0.5,
  autoResize: true,
};
const style = {
  width: width,
  height: height,
  // marginTop: 'auto',
  margin: '0 auto',
};

type Props = {
  playerIndex: number
}

export const GameStage  = (props: Props) => {

  const playerIndex = props.playerIndex;
  console.log(playerIndex)

  const snap = useSnapshot(gameStore) as TypeGameStore;

  const handlePlayer2Click = (target: any) => {
    // makePlayerMove(1, target);
  }

  const handlePlayer1Click = (target: any) => {
    console.log('click')
    playerMove(playerIndex, target);
  }

  const filter = new PIXI.filters.ColorMatrixFilter

  return (
    <Stage className='game-stage' options={options} style={style}>
      {/* <Sprite
        width={1280}
        height={600}
        source={'./assets/cover.png'}
        scale={2}
      ></Sprite> */}
      {/* <Sprite
        // scale={1}
        source={'./assets/table.png'}
      > */}
      {/* </Sprite> */}
      <ContainerWithName
      name={'DeckContainer'}
        x={100}
      >
        {snap.deckCards?.map((card: TypeCard, index, array) => {
          const cardPath: string = `./assets/cards/${card.suit.slice(0, 1).concat(card.rank.toString())}.png`;
          const cardTexture = Texture.from(cardPath);
          if (index === array.length - 1) {
            return <CardComponent
            key={card.name}
            name={card.name}
            anchor={[0.5,-0.5]}
            x={0 + index*10}
            y={0}
            width={50}
            height={70}
            texture={cardTexture}
            eventMode={'static'}
          />
          }
          return <CardComponent
            key={card.name}
            name={card.name}
            anchor={0}
            x={0 + index*20}
            y={0}
            width={50}
            height={70}
            texture={cardTexture}
            eventMode={'static'}
          />
        })}
      </ContainerWithName>
      <ContainerWithName
        name={"Player2Container"}
        x={100}
        y={100}
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
            x={0 + index*30}
            y={0}
            width={50}
            height={70}
            texture={cardTexture}
            eventMode={'static'}
            click={(event: Event) => {
              handlePlayer2Click(event.target)
            }}
          />
        })}
      </ContainerWithName>
      <ContainerWithName
        name={"PlacedCardsContainer"}
        x={100}
        y={300}
      >
        {snap.placedCards.map((cardsPair: TypePlacedCard, index) => {
          console.log(cardsPair)
          const cardAttacker = cardsPair.attacker as TypeCard,
                cardDefender = cardsPair.defender? cardsPair.defender : null;
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
              anchor={0}
              x={0 + index*50}
              y={0}
              width={50}
              height={70}
              texture={cardAttackerTexture}
            />
            {cardDefender ? (
              <CardComponent
              key={cardDefender.name}
              name={cardDefender.name}
              anchor={-0.2}
              x={0 + index*50}
              y={0}
              width={50}
              height={70}
              texture={cardDefenderTexture}
            />
            ) : null }
          </>
        })}
      </ContainerWithName>
      <ContainerWithName
        name={"Player1Container"}
        x={100}
        y={500}
      >
        {snap.players[playerIndex].cards.map((card: TypeCard, index) => {
          const cardPath: string = `./assets/cards/${card.suit.slice(0, 1).concat(card.rank.toString())}.png`;
          const cardTexture = Texture.from(cardPath);

          return <CardComponent
            key={card.name}
            name={card.name}
            anchor={0}
            x={0 + index*30}
            y={0}
            width={50}
            height={70}
            texture={cardTexture}
            tint={checkIfAvailable(playerIndex, card) ? '0xFFFFFF' : '0x505050'}
            eventMode={'static'}
            click={(event: Event) => {
              handlePlayer1Click(event.target)
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
  //   // I use Promises for no reason other than I often work with 
  //   // ancient hardware.
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

  // I changed this to null as TS complained about returning a string
  // if (!textures) {
  //   return null;
  // }
