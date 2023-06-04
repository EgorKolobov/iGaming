import React from 'react';
import {
    Accordion,
    AccordionButton,
    AccordionItem, AccordionPanel,
    Box,
    Button,
    Icon,
    Tooltip,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { API } from '../api';

const games = [{ name: 'Chess', link: 'https://www.chess.com/game/59bf5d6e-f80d-11ed-aa8a-01bed301000f' }, {
    name: 'Poker', link: 'https://www.247freepoker.com/',
}, { name: 'Solitaire', link: 'https://www.google.com/logos/fnbx/solitaire/standalone.html' }, {
    name: 'Blackjack', link: 'https://kevinleedrum.github.io/vlackjack/',
},];


const Nav = ({ setCurrentLink, setIsAuth, isAdmin, listGames, setListGames, setCurrentId }) => {

    React.useEffect(() => {
        API.games.typesGames()
          .then((res) => {
              setListGames(res.data);
          })
          .catch(() => {})
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const {pathname} = location;

    return (<VStack bg={'gray.700'} minHeight={'100vh'} maxHeight={'100%'} position={'relative'} zIndex={90} h={'100%'} w={'100%'} maxW={'250px'}>
        <VStack maxHeight={'100vh'} overflowY={'scroll'} pt={'50px'} mb={'200px'} w={'100%'} spacing={'10px'}>
            <Accordion w={'100%'} allowToggle allowMultiple>
                {listGames.map((item, index) => (
                  <AccordionItem w={'100%'} key={`accordion-item-${index}`}>
                      <AccordionButton overflow={'hidden'} h={'30px'} minH={'30px'} w={'100%'}
                        // bg={pathname.includes(item.name) && bgButtonActive}
                              fontWeight={'400'}
                      >{item.type}
                      </AccordionButton>
                      <AccordionPanel px={'0px'} w={'100%'}>
                          {item?.games?.map((game) => (
                            <Button key={`game-item-${game.id}`} borderRadius={'0'} overflow={'hidden'} h={'30px'} minH={'30px'} w={'100%'}
                                    onClick={() => {
                                        setCurrentId(game.id);
                                        setCurrentLink(game.url);
                                        navigate(`/game/${game.name}`)
                                    }}
                            >
                                {game.name}
                            </Button>
                          ))}
                      </AccordionPanel>
                  </AccordionItem>
                ))}
            </Accordion>
        </VStack>
        <Box position={'absolute'} w={'100%'} bottom={'20px'}>
            <Button h={'40px'} mb={'10px'} onClick={() => {navigate(`/`);}} w={'90%'} fontWeight={'400'}>
                Home
            </Button>
            {isAdmin && <Button h={'40px'} mb={'20px'} onClick={() => {navigate(`/admin/panel`);}} w={'90%'} fontWeight={'400'}>
                Admin panel
            </Button>}

            <Button colorScheme={'red'} onClick={async () => {
                await API.auth.logout()
                  .catch(() => {});
                setIsAuth(false);
                localStorage.removeItem('igaming');
                navigate(`/login`);
                setCurrentLink('');
            }} h={'40px'} w={'90%'} fontWeight={'400'}>
                Exit
            </Button>
        </Box>
    </VStack>);
};

export default Nav;