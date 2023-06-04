import React from 'react';
import {
  Box, Button, createStandaloneToast, FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input, Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text, useToast,
  VStack,
} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import { API } from '../api';

const AdminPanel = ({ setListNavGames }) => {
  const toast = useToast({
    position: 'top-right',
    duration: 3000,
    isClosable: true,
  })

  const [gameName, setGameName] = React.useState('');
  const [errorNoGameName, setErrorNoGameName] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [errorNoUrl, setErrorNoUrl] = React.useState(false);
  const [type, setType] = React.useState('');
  const [errorNoTypes, setErrorNoTypes] = React.useState(false);
  const [linkImage, setLinkImage] = React.useState('');
  const [listTypes, setListTypes] = React.useState([]);


  const [idGame, setIdGame] = React.useState('');
  const [listGames, setListGames] = React.useState([]);

  const [typeGame, setTypeGame] = React.useState('');
  const [errorNoTypeGame, setErrorNoTypeGame] = React.useState(false);
  const [urlTypeGame, setUrlTypeGame] = React.useState('');

  React.useEffect(() => {
    API.games.typesGames()
      .then((res) => {
        setListNavGames(res.data);
      })
      .catch(() => {})
  }, [listTypes, listGames])

  React.useEffect(() => {
    API.types.getTypes()
      .then((res) => {
        const array = [];
        res.data.map((item) => {
          array.push({id: item.id, name: item.name, info: item.info})
        })
        setListTypes(array);
      })
      .catch((err) => {
        toast({ title: 'You do not have rights to get the list of game types!', status: 'error' })
      })

    API.games.getGames()
      .then((res) => {
        const array = [];
        res.data.map((item) => {
          array.push({id: item.id, name: item.name, description: item.description, url: item.url})
        })
        setListGames(array);
      })
      .catch((err) => {
        toast({ title: 'You do not have rights to get the list of games!', status: 'error' })
      })
  }, [])

  const createGame = () => {
    API.games.create({description: description, name: gameName, type: Number(type), url: url})
      .then(() => {
        setGameName('');
        setDescription('');
        setType('');
        setUrl('');
        toast({ title: 'The game was created successfully!', status: 'success' })
        API.games.getGames()
          .then((res) => {
            const array = [];
            res.data.map((item) => {
              array.push({id: item.id, name: item.name, description: item.description, url: item.url})
            })
            console.log(array);
            setListGames(array);
          })
          .catch((err) => {
            toast({ title: 'You do not have rights to get the list of games!', status: 'error' })
          });

        // API.games.typesGames()
        //   .then((res) => {
        //     setListGames(res.data);
        //   })
        //   .catch(() => {});
      })
      .catch((err) => {
        toast({ title: 'Failed to create new game!', status: 'error' })
      })
  }

  const updateGame = () => {
    API.games.update({description: description, name: gameName, id: idGame})
      .then(() => {
        setGameName('');
        setDescription('');
        setIdGame('');
        toast({ title: 'The game was updated successfully!', status: 'success' })
        API.games.getGames()
          .then((res) => {
            const array = [];
            res.data.map((item) => {
              array.push({id: item.id, name: item.name, description: item.description, url: item.url})
            })
            setListGames(array);
          })
          .catch((err) => {
            toast({ title: 'You do not have rights to get the list of games!', status: 'error' })
          });

        // API.games.typesGames()
        //   .then((res) => {
        //     setListGames(res.data);
        //   })
        //   .catch(() => {});

      })
      .catch((err) => {
        toast({ title: 'Failed to update game!', status: 'error' })
      })
  }

  const deleteGame = () => {
    API.games.delete({id: idGame})
      .then(() => {
        setIdGame('');
        toast({ title: 'The game was deleted successfully!', status: 'success' })
        API.games.getGames()
          .then((res) => {
            const array = [];
            res.data.map((item) => {
              array.push({id: item.id, name: item.name, description: item.description, url: item.url})
            })
            console.log(array);
            setListGames(array);
          })
          .catch((err) => {
            toast({ title: 'You do not have rights to get the list of games!', status: 'error' })
          });

        // API.games.typesGames()
        //   .then((res) => {
        //     setListGames(res.data);
        //   })
        //   .catch(() => {});
      })
      .catch((err) => {
        toast({ title: 'Failed to delete game!', status: 'error' })
      })
  }

  const createTypeGame = () => {
    API.types.postTypes({name: typeGame, info: urlTypeGame})
      .then(() => {
        setTypeGame('');
        setType('');
        setUrlTypeGame('');
        toast({ title: 'The type game was created successfully!', status: 'success' })
        API.types.getTypes()
          .then((res) => {
            const array = [];
            res.data.map((item) => {
              array.push({id: item.id, name: item.name, info: item.info})
            })
            setListTypes(array);
          })
          .catch((err) => {
            toast({ title: 'You do not have rights to get the list of game types!', status: 'error' })
          })

        // API.games.typesGames()
        //   .then((res) => {
        //     setListGames(res.data);
        //   })
        //   .catch(() => {});
      })
      .catch((err) => {
        toast({ title: "Failed to create new game's type!", status: 'error' })
      })

  }

  const updateTypeGame = () => {
    API.types.putTypes({id: Number(type), name: typeGame, info: urlTypeGame})
      .then(() => {
        setTypeGame('');
        setType('');
        setUrlTypeGame('');
        toast({ title: "The game's type was updated successfully!", status: 'success' })
        API.types.getTypes()
          .then((res) => {
            const array = [];
            res.data.map((item) => {
              array.push({id: item.id, name: item.name, info: item.info})
            })
            setListTypes(array);
          })
          .catch((err) => {
            toast({ title: "You do not have rights to get the list of game's type!", status: 'error' })
          })

        // API.games.typesGames()
        //   .then((res) => {
        //     setListGames(res.data);
        //   })
        //   .catch(() => {});

      })
      .catch((err) => {
        toast({ title: "Failed to update game's type!", status: 'error' })
      })

  }

  const deleteTypeGame = () => {
    API.types.deleteTypes({id: type})
      .then(() => {
        setType('');
        toast({ title: "The game's type was deleted successfully!", status: 'success' })
        API.types.getTypes()
          .then((res) => {
            const array = [];
            res.data.map((item) => {
              array.push({id: item.id, name: item.name, info: item.info})
            })
            setListTypes(array);
          })
          .catch((err) => {
            toast({ title: "You do not have rights to get the list of game's type!", status: 'error' })
          })

        // API.games.typesGames()
        //   .then((res) => {
        //     setListGames(res.data);
        //   })
        //   .catch(() => {});
      })
      .catch((err) => {
        toast({ title: "Failed to delete game's type!", status: 'error' })
      })
  }

  return (
    <Box zIndex={105} w={'100%'} minH={'100vh'} maxH={'100vh'}>
      <Tabs mt={'10px'} size='md' isFitted variant='enclosed'>
        <TabList >
          <Tab>Create game</Tab>
          <Tab>Update game</Tab>
          <Tab borderRight={'1px solid #3F444E'} borderTopRightRadius={'0px'}>Delete game</Tab>
          <Tab borderLeft={'1px solid #3F444E'} borderTopLeftRadius={'0px'}>Create type</Tab>
          <Tab>Update type</Tab>
          <Tab>Delete type</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack mt={'20px'} mx={'auto'} w={'500px'} spacing={'25px'}>
              <FormControl isRequired isInvalid={errorNoGameName && !gameName}>
                <FormLabel>Game name:</FormLabel>
                <Input
                  placeholder="Enter name game"
                  value={gameName}
                  onChange={e => setGameName(e.target.value)}
                />
                {errorNoGameName && !gameName && (
                  <FormErrorMessage>
                    Name game field is empty
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Description:</FormLabel>
                <Input
                  placeholder="Enter game description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired isInvalid={errorNoUrl && !url}>
                <FormLabel>Game's url:</FormLabel>
                <Input
                  placeholder="Enter game url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                />
                {errorNoUrl && !url && (
                  <FormErrorMessage>
                    Game's url field is empty
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={errorNoTypes && !type}>
                <FormLabel>Game's type:</FormLabel>
                <Select placeholder="Choose game's type" value={type} onChange={e => setType(e.target.value)} >
                  {listTypes.map((item) => {
                    return <option key={`option-types-${item?.id}`} value={item?.id}>{item?.name}</option>
                  })}
                </Select>
                {errorNoTypes && !type && (
                  <FormErrorMessage>
                    Game's type field is empty
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Image:</FormLabel>
                <Select
                  placeholder="Load image file"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </FormControl>

              <Button onClick={createGame}>
                Create game
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack mt={'20px'} mx={'auto'} w={'500px'} spacing={'25px'}>
              <FormControl isRequired isInvalid={errorNoGameName && !gameName}>
                <FormLabel>Game name:</FormLabel>
                <Select placeholder="Choose game" value={idGame} onChange={(e) => {setIdGame(e.target.value);
                  const game = listGames.find(element => element.id === Number(e.target.value));
                  setDescription(game?.description);
                  setGameName(game?.name)}} >
                  {listGames.map((item) => {
                    return <option key={`option-game-${item?.id}`} value={item?.id}>{item?.name}</option>
                  })}
                </Select>
                {errorNoGameName && !gameName && (
                  <FormErrorMessage>
                    Name game field is empty
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={errorNoGameName && !gameName}>
                <FormLabel>New game's name:</FormLabel>
                <Input
                  placeholder="Enter new game's name"
                  value={gameName}
                  onChange={e => setGameName(e.target.value)}
                />
                {errorNoGameName && !gameName && (
                  <FormErrorMessage>
                    Name game field is empty
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Description:</FormLabel>
                <Input
                  placeholder="Enter game description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image:</FormLabel>
                <Select
                  placeholder="Load image file"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </FormControl>

              <Button onClick={updateGame}>
                 Update game
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack mt={'20px'} mx={'auto'} w={'500px'} spacing={'25px'}>
              <FormControl isRequired isInvalid={errorNoGameName && !gameName}>
                <FormLabel>Game name:</FormLabel>
                <Select placeholder="Choose game" value={idGame} onChange={(e) => {setIdGame(e.target.value);
                  setGameName(listGames.find(element => element.id === Number(e.target.value)).name)}} >
                  {listGames.map((item) => {
                    return <option key={`option-game-${item?.id}`} value={item?.id}>{item?.name}</option>
                  })}
                </Select>
                {errorNoGameName && !gameName && (
                  <FormErrorMessage>
                    Name game field is empty
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button onClick={deleteGame}>
                Delete game
              </Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack mt={'20px'} mx={'auto'} w={'500px'} spacing={'25px'}>
              <FormControl isRequired isInvalid={errorNoTypeGame && !typeGame}>
                <FormLabel>Game type:</FormLabel>
                <Input
                  placeholder="Enter game type name"
                  value={typeGame}
                  onChange={e => setTypeGame(e.target.value)}
                />
                {errorNoTypeGame && !typeGame && (
                  <FormErrorMessage>
                    Type game field is empty
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Info url:</FormLabel>
                <Input
                  placeholder="Enter info url"
                  value={urlTypeGame}
                  onChange={e => setUrlTypeGame(e.target.value)}
                />
              </FormControl>
              <Button onClick={createTypeGame}>
                Create type game
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack mt={'20px'} mx={'auto'} w={'500px'} spacing={'25px'}>
              <FormControl isRequired isInvalid={errorNoTypes && !type}>
                <FormLabel>Game's type:</FormLabel>
                <Select placeholder="Choose game's type" value={type} onChange={e => {setType(e.target.value);
                  const type = listTypes.find(element => element.id === Number(e.target.value));
                  setTypeGame(type?.name);
                  setUrlTypeGame(type?.info);
                }}
                >
                  {listTypes.map((item) => {
                    return <option key={`option-types-${item?.id}`} value={item?.id}>{item?.name}</option>
                  })}
                </Select>
                {errorNoTypes && !type && (
                  <FormErrorMessage>
                    Game's type field is empty
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={errorNoTypeGame && !typeGame}>
                <FormLabel>Game type:</FormLabel>
                <Input
                  placeholder="Enter game type name"
                  value={typeGame}
                  onChange={e => setTypeGame(e.target.value)}
                />
                {errorNoTypeGame && !typeGame && (
                  <FormErrorMessage>
                    Type game field is empty
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Info url:</FormLabel>
                <Input
                  placeholder="Enter info url"
                  value={urlTypeGame}
                  onChange={e => setUrlTypeGame(e.target.value)}
                />
              </FormControl>

              <Button onClick={updateTypeGame}>
                Update type game
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack mt={'20px'} mx={'auto'} w={'500px'} spacing={'25px'}>
              <FormControl isRequired isInvalid={errorNoTypes && !type}>
                <FormLabel>Game's type:</FormLabel>
                <Select placeholder="Choose game's type" value={type} onChange={e => setType(e.target.value)} >
                  {listTypes.map((item) => {
                    return <option key={`option-types-${item?.id}`} value={item?.id}>{item?.name}</option>
                  })}
                </Select>
                {errorNoTypes && !type && (
                  <FormErrorMessage>
                    Game's type field is empty
                  </FormErrorMessage>
                )}
              </FormControl>
                <Button onClick={deleteTypeGame}>
                  Delete type game
                </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/*<HStack position={'relative'} justifyContent={'flex-start'} alignItems={'start'}>*/}
      {/*  <Text>123</Text>*/}
      {/*  <Text>123</Text>*/}
      {/*</HStack>*/}
    </Box>
  );
};

export default AdminPanel;