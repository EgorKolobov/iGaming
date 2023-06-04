import React from 'react';
import {
    Box,
    Button, createStandaloneToast,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel, Icon,
    Input, InputGroup, InputRightElement,
    Stack,
    Text, useColorModeValue, useMediaQuery, useToast,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {API} from "../api";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


const Login = ({setIsAuth, isRegistration}) => {
    const toast = useToast({
        position: 'top-right',
        duration: 3000,
        isClosable: true,
    })

    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [show, setShow] = React.useState(false);
    const [errorNoEmail, setErrorNoEmail] = React.useState(false);
    const [errorNoUserName, setErrorNoUserName] = React.useState(false);
    const [errorNoPassword, setErrorNoPassword] = React.useState(false);
    const [errorNoRepeatPassword, setErrorNoRepeatPassword] = React.useState(false);
    const [isSmallerThan400] = useMediaQuery('(max-width: 400px)');

    const handleClick = () => setShow(!show);

    const handleLogin = e => {
        e.preventDefault();
        setErrorNoEmail(false);
        setErrorNoPassword(false);
        setErrorNoRepeatPassword(false);
        setErrorNoUserName(false);
        if (!email) {
            setErrorNoEmail(true);
        }
        if (!password) {
            setErrorNoPassword(true);
        }
        if (isRegistration && (!repeatPassword || repeatPassword !== password)) {
            setErrorNoRepeatPassword(true);
        }
        if (isRegistration && !userName) {
            setErrorNoUserName(true);
        }
        if (!isRegistration && email && password ) {
            API.auth.login({username: email, password})
                .then((res) => {
                    localStorage.setItem('igaming', res.data.auth_token);
                    setIsAuth(true);
                })
                .catch((err) => {
                    toast({ title: 'Incorrect login or password', status: 'error' })
                    setPassword('');
                })
        }

        if (isRegistration && email && password && password === repeatPassword && userName) {
            API.auth.register({username: userName, email, password})
                .then(() => {
                    toast({ title: 'User successfully created', status: 'success' });
                    navigate('/login');
                })
                .catch(() => {
                    toast({ title: 'Unable to register', status: 'error' });
                })
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <Flex minH={'100vh'} w={'100vw'} boxSizing={'content-box'} justifyContent={'center'} alignItems={'center'}>
                <Stack justifyContent={'center'} boxSizing={'content-box'} margin={'0 auto'} px={isSmallerThan400?'10px':'50px'} py={'50px'} pt="20px" minH="500px" minW={'220px'} width={'100%'} maxWidth="600px">
                    <Text fontSize={'22px'}  py={'5px'}
                          textAlign={'center'}>iGaming training service</Text>
                    <FormControl isInvalid={errorNoEmail && !email}>
                        <FormLabel>Username:</FormLabel>
                        <Input
                            placeholder="Enter username"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {errorNoEmail && !email && (
                            <FormErrorMessage>
                                Username field is empty
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    {isRegistration && <FormControl isInvalid={errorNoUserName && !userName}>
                        <FormLabel mt={'20px'}>Email:</FormLabel>
                        <Input
                            placeholder="Enter email"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                        {errorNoUserName && !userName && (
                            <FormErrorMessage>
                                Email field is empty
                            </FormErrorMessage>
                        )}
                    </FormControl>}

                    <FormControl isInvalid={errorNoPassword && !password}>
                        <FormLabel mt={'20px'}>Password:</FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={show ? 'text' : 'password'}
                                placeholder="Enter password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" mr="8px" size="xs"
                                        onClick={handleClick}>
                                    {show ? <Icon as={ViewOffIcon} /> : <Icon as={ViewIcon} />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {errorNoPassword && !password && (
                            <FormErrorMessage>
                                Password field is empty
                            </FormErrorMessage>
                        )}
                    </FormControl>

                    {
                        isRegistration && <FormControl isInvalid={errorNoRepeatPassword && (!repeatPassword  || repeatPassword !== password) }>
                            <FormLabel mt={'20px'}>Repeat password:</FormLabel>
                            <InputGroup size="md">
                                <Input
                                    pr="4.5rem"
                                    type={show ? 'text' : 'password'}
                                    placeholder="Repeat password"
                                    value={repeatPassword}
                                    onChange={e => setRepeatPassword(e.target.value)}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" mr="8px" size="xs"
                                            onClick={handleClick}>
                                        {show ? <Icon as={ViewOffIcon} /> : <Icon as={ViewIcon} />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {errorNoRepeatPassword && (!repeatPassword || repeatPassword !== password) && (
                                <FormErrorMessage>
                                    Repeat password field is empty
                                </FormErrorMessage>
                            )}
                        </FormControl>
                    }
                    {
                        isRegistration ?
                            <Flex pt={'35px'} justifyContent={'space-between'} width="100%">
                                <Button type="submit" width="50%" variant="solid">
                                    Register
                                </Button>
                                <Button onClick={() => navigate('/email')} width="40%" variant="solid">
                                    Authorization
                                </Button>
                            </Flex>
                            :
                            <Flex pt={'35px'} justifyContent={'space-between'} width="100%">
                                <Button type="submit" width="45%" variant="solid">
                                    Log in
                                </Button>
                                <Button onClick={() => navigate('/register')} width="45%" variant="solid">
                                    Registration
                                </Button>
                            </Flex>
                    }
                </Stack>
            </Flex>
        </form>
    );
};

export default Login;