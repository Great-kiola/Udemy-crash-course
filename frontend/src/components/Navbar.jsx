import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Container maxW={"1140px"}>
      <Flex
        h = {16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{ 
          base: "column", 
          sm: "row" 
        }}
      >

        <Text 
          fontSize = {{ base: "22", sm: "28"}}
          fontWeight = {"bold"}
          textTransform = {"uppercase"}
          textAlign = {"center"}
          bgGradient = {"linear(to-r, #7928CA, #FF0080)"}
          bgClip = {"text"}     
        >
          <Link to ={"/"}> Product Store 🛒 </Link>

        </Text>

        <HStack spacing= {"2"} alignItems={"center"}>
          <Link to = {"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20}/>
            </Button>
            
          </Link>

        </HStack>


      </Flex>
    </Container>
  )
}

export default Navbar