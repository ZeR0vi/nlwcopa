import {  Button as But, Text, IButtonProps, Icon  } from 'native-base';

interface Props extends IButtonProps{
    title: string;
    type?: 'PRIMARY' | 'SECONDARY'
}

export function Button( { title,type = 'PRIMARY', ...rest  } : Props ){
    return(
        <But 
        w="full"
        h={14}
        rounded="sm"
        fontSize="md"
        textTransform="uppercase"
        bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
        _pressed={{
            bg: type === 'SECONDARY' ? 'red.600' : 'yellow.600'
        }}
        _loading={{
            _spinner:  {color: 'yellow.600'} 
        }}
        
        {...rest}>
            <Text
            fontSize='sm'
            fontFamily="heading"
            color={type === 'SECONDARY' ? 'white' : 'black'}
            
            >{title}</Text>
        </But>
    )
}