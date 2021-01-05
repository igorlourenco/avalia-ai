import React, { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    Button, Box
} from '@chakra-ui/react';


import { deleteProduct } from '../libraries/database';
import { useAuth } from '../libraries/auth';
import {AiFillDelete} from 'react-icons/ai'

const DeleteProductButton = ({ productId }) => {
    const [isOpen, setIsOpen] = useState<boolean>();
    const cancelRef = useRef();
    const auth = useAuth();

    const onClose = () => setIsOpen(false);
    const onDelete = async () => {
        await deleteProduct(productId);
        mutate(
            auth.user ? ['/api/products', auth.user.ya] : null,
            async (data) => {
                return {
                    products: data.products.filter(
                        (product) => product.id !== productId
                    )
                };
            },
            false
        );
        onClose();
    };

    return (
        <>
            <IconButton variant={`ghost`} aria-label="Deletar produto" icon={<Box as={AiFillDelete} color={`red.600`} size={18}/>} onClick={() => setIsOpen(true)}/>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Deletar produto
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Você tem certeza que deseja deletar este produto?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={onDelete} ml={3}>
                            Deletar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DeleteProductButton;