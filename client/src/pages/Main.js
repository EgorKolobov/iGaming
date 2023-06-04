import React from 'react';
import {
  Card,
  CardBody, CardFooter,
  CardHeader,
 Image,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';



const Main = ({ setCurrentLink, setCurrentId }) => {

  const navigate = useNavigate();

  const toast = useToast({
    position: 'top-right',
    duration: 3000,
    isClosable: true,
  })

  const [allGames, setAllGames] = React.useState([]);

  React.useEffect(() => {
    API.games.getGames()
      .then((res) => {
        setAllGames(res.data)
      })
      .catch(() => {
        toast({ title: 'Failed to get the games', status: 'error' });
      })
  }, []);

  return (
      <VStack position={'relative'} zIndex={105} w={'100%'} minH={'100vh'} maxH={'100vh'} pt={'60px'} justifyContent={'center'} alignItems={'center'}>
          <Text fontSize={'24px'} fontWeight={'400'}>Choose the game</Text>
        <SimpleGrid w={'100%'} p={'10px'} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
          {allGames.map((game) => (
            <Card _hover={{cursor: 'pointer', border: 'solid 2px black'}} onClick={() => {setCurrentLink(game.url); setCurrentId(game.id); navigate(`game/${game.name}`)}} key={`game-main-${game.id}`}>
              <CardBody>
                <Image src={game.image}></Image>
              </CardBody>
                <Text mb={'20px'}>{game.name}</Text>
            </Card>
            )
          )}
        </SimpleGrid>
      </VStack>
  );
};

export default Main;