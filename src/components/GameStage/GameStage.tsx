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
import { gameStore } from "../store/gameStore";
import '@pixi/events';
import { 
  TypeCard,
  TypePlacedCard,
  TypeGameStatus
} from "../../types/types";
import {
  giveCardsOnStart, makePlayer1Move
} from '../utils/utils'
import {
  Button,
  FancyButton,
  ButtonContainer
} from '@pixi/ui'


// const ButtonComponent = PixiComponent('ButtonComponent', {
//   create: () => new ButtonContainer(
//     new Graphics()
//         .beginFill(0xFFFFFF)
//         .drawRoundedRect(0, 0, 100, 50, 15)
// ),
//   // applyProps: (props) => {...props}
// });

const spritesheetUrl =
  "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";

const width = window.innerWidth;
const height = window.innerHeight;
const options = {
  backgroundColor: 'green',
  resolution: window.devicePixelRatio,
  width: width,
  height: height,
};
const style = {
  width: width,
  height: height,
};

export const GameStage  = () => {
  // I used textures for simplicity, 
  // but the docs say that using a spritesheet prop and constructor is best
  const [textures, setTextures] = useState([]);
  const snap = useSnapshot(gameStore);

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

  // can I leave this aspect to you?

  // const toggleAnimation = useCallback(() => {
  //   if (animationRef.current) {
  //     animationRef.current.playing
  //       ? animationRef.current.stop()
  //       : animationRef.current.play();
  //   }
  // }, []);

  // console.log('[Game] textures', textures)

  // I changed this to null as TS complained about returning a string
  // if (!textures) {
  //   return null;
  // }

  // console.log(PIXI.Sprite.from('assets/cards/C6.png'))

  // const cardPath: string = `./assets/cards/C6.png`;
  // const cardTexture = PIXI.Texture.from(cardPath);

  // const handleClick = (target: any) => {
  //   // if (typeof e.target === typeof Sprite) {
  //   //   // const sprite = JSON.stringify(e.target)
  //   //   console.log(sprite)
  //   // }
  //   console.log(target)
  //   console.log(target.name!);
  //   console.log(target.parent)
    
  //   const cardIndex: number = snap.deckCards!.indexOf(snap.deckCards.filter(card => card.name === target.name as string)[0]);
  //   const card: TypeCard = gameStore.deckCards!.splice(cardIndex, 1)[0] as TypeCard;
  //   const placedCard = Object.create({ attacker:card }) as TypePlacedCard
  //   gameStore.placedCards = [...gameStore.placedCards!, placedCard];
  //   console.log(gameStore.placedCards[0].attacker.name)

  // }

  const handlePlayer2Click = (e:any) => {
    // makeMove(e.target);

  }

  const handlePlayer1Click = (target: any) => {
    makePlayer1Move(target);
  }

  return (
    <Stage options={options} style={style}>
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


      <ContainerWithName
      name={'DeckContainer'}
        x={100}
      >
        {snap.deckCards?.map((card, index, array) => {

const cardPath: string = `./assets/cards/${card.suit.slice(0, 1).concat(card.rank.toString())}.png`;
const cardTexture = Texture.from(cardPath);

          if (index === array.length - 1) {
            return <CardComponent
            key={card.name}
            name={card.name}
            anchor={[0,-0.2]}
            x={0 + index*10}
            y={0}
            width={50}
            height={70}
            texture={cardTexture}
            interactive={true}
            eventMode={'static'}
            // click={(event: Event) => {
            //   handleClick(event.target)
            // }}
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
            interactive={true}
            eventMode={'static'}
            // click={(event: Event) => {
            //   handleClick(event.target)
            // }}
          />
        })}
        {/* <Sprite anchor={0.5} x={100} y={100} texture={cardTexture} /> */}
      </ContainerWithName>
      <ContainerWithName
        name={"Player2Container"}
        x={100}
        y={100}
      >
        {snap.players[1].cards.map((card, index) => {
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
            interactive={true}
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
        {snap.placedCards.map((cardsPair, index) => {
          if (cardsPair.attacker) {
            const card = cardsPair.attacker as TypeCard;
            const cardPath: string = `./assets/cards/${card.suit.slice(0, 1).concat(card.rank.toString())}.png`;
            const cardTexture = Texture.from(cardPath);

            return <CardComponent
            key={card.name}
            name={card.name}
            anchor={0}
            x={0 + index*40}
            y={0}
            width={50}
            height={70}
            texture={cardTexture}
          />
          } 
          if (cardsPair.defender) {
            const card = cardsPair.defender as TypeCard;
            const cardPath: string = `./assets/cards/${card.suit.slice(0, 1).concat(card.rank.toString())}.png`;
            const cardTexture = Texture.from(cardPath);

            return <CardComponent
            key={card.name}
            name={card.name}
            anchor={-0.2}
            x={0 + index*40}
            y={0}
            width={50}
            height={70}
            texture={cardTexture}
          />
          }


         
        })}
      </ContainerWithName>
      <ContainerWithName
        name={"Player1Container"}
        x={100}
        y={500}
      >
        {snap.players[0].cards.map((card, index) => {
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
            interactive={true}
            eventMode={'static'}
            click={(event: Event) => {
              handlePlayer1Click(event.target)
            }}
          />
        })}
      </ContainerWithName>
  
      {/* <AnimatedSprite
        initialFrame={0}
        isPlaying={true}
        position={[300,75]} // changed to a Point tuple
        // textures={Object.values(textures)}
        interactive={true}
        // pointerdown={toggleAnimation} */}
      {/* /> */}
    </Stage>
  );
}

export const CardComponent = (props: any) => <Sprite {...props} />;

const ContainerWithName = (props: any) => <Container {...props} />;



