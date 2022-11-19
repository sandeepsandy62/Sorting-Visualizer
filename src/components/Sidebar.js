import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Select,
    Button,
    Box,
    FormControl,
    FormLabel,
    Flex,
} from "@chakra-ui/react";


import React , {useState} from "react" ;

const Sidebar = ({generateArr,sort}) => {
    //declaring a state object so , that we don't need 
    //to create multiple state objects
    const [formState,setFormState] = useState({
        size:10,
        algorithm:"choose option",
    });

    return(
        //gray.100 is picking a color which is nested in gray
        //We can say it is a variant of gray
        //p = padding

    <Box 
    minW = "xs" bg="gray.100" p={"4"}
    borderRadius="lg" overflow="hidden">

        {/* Slider Form Control */}
        <FormControl>
            <FormLabel htmlFor="size">{`Array Size (${formState.size})`}</FormLabel>
            <Slider

            //Function called when the user is done selecting a new value (by dragging or clicking)
            onChange={
                (value)=>setFormState({...formState,size:value})
            }

            aria-label={"10"}
            min={10}
            max={100}
            defaultValue={10}
            >
                <SliderTrack>
                    <SliderFilledTrack/>
                </SliderTrack>
                <SliderThumb/>
            </Slider>
        </FormControl>

        {/* Algorithm Select */}
        <FormControl>
            <FormLabel htmlFor="algorithm">Algorithm</FormLabel>
            <Select placeholder="choose here"

            //onchange
            onChange={
                (value)=>{
                    setFormState({...formState,algorithm:value.target.value})
                }
            }
            //props
            bg = {"white"} id = "algorithm" variant={"outline"}
            
            >
                <option value="bubble">Bubble Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="merge">Merge Sort</option>
                <option value="quick">Quick Sort</option>
                
            </Select>
        </FormControl>

        <Flex gap={"3"} mt={"5"} direction="row">

        {/* Generate Array Button */}
        <Button

        //Onclick
        onClick={()=>{
            generateArr(formState);
        }}

        colorScheme="purple"
        variant="solid"
        color="white">
        Generate Array
        </Button>
        
        {/* Button Sort */}
        <Button

        //onclick
        onClick={()=>{sort(formState)}}

        colorScheme = "purple"
        variant = "solid"
        color="white">
        Sort
        </Button>

        </Flex>

    </Box>
    );
}

export default Sidebar;