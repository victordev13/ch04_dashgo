import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Logo } from '../components/Header/Logo';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> =
    async (formData, event) => {};

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}>
        <Flex justify="center">
          <Logo />
        </Flex>

        <Stack spacing={4}>
          <Input
            type="email"
            name="email"
            label="Email"
            error={errors.email}
            {...register('email')}
          />
          <Input
            type="password"
            name="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}>
            Entrar
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
