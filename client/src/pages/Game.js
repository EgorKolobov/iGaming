import React from 'react';
import { Box, Flex, Text, useToast, VStack } from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import { API } from '../api';

const Game = ({currentLink, currentId}) => {
    const { name } = useParams();

    const toast = useToast({
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    })

    const [game, setGame] = React.useState({});

    React.useEffect(() => {
      API.games.getGameById({id: currentId})
        .then((res) => {
          setGame(res.data);
        })
        .catch(() => {
          toast({ title: "Failed to get game's data", status: 'error' })
        })
    }, [currentId])

    return (
        <VStack overflowY={'auto'} key={currentLink} pt={'50px'} px={'50px'} position={'relative'} zIndex={105} w={'100%'} minH={'100vh'} maxH={'100vh'} alignItems={'start'}>

          <VStack mb={'10px'} w={'100%'} justifyContent={'center'}>
            <Text>Game: {name}</Text>
            {currentLink === 'https://www.247freepoker.com/' && <Box zIndex={100} width={'1200px'} height={'10px'}>
              <Box bgColor={'#1A202C'} width={'1200px'} height={'101px'} zIndex={100}></Box>
            </Box>}
              <iframe zIndex={50} width={'1200px'} height={'750px'} src={currentLink} frameborder="0" scrolling="no" />
            {currentLink === 'https://www.247freepoker.com/' && <Box width={'1200px'} height={'100px'}>
                <Box zIndex={101} bgColor={'#1A202C'} width={'1200px'} height={'100px'} marginTop={'-70px'}></Box>
              </Box>}
            {currentLink === 'https://www.247freepoker.com/' && <Box width={'1200px'} height={'100px'}>
              <Box zIndex={101} width={'183px'} height={'64px'} marginTop={'-375px'} ml={'612px'}></Box>
            </Box>}
          </VStack>
            <Text>Description: {game.description}</Text>
        </VStack>
    );
};

export default Game;