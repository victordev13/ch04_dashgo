import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input/Input';

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm();

  const handleSignIn: SubmitHandler<SignInFormData> =
    async (formData, event) => {
      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );
    };

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
        <Stack spacing={4}>
          <Input
            type="email"
            name="email"
            label="Email"
            {...register('email')}
          />
          <Input
            type="password"
            name="password"
            label="Senha"
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
