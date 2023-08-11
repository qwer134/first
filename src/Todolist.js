import { CheckIcon,MoonIcon  } from "@chakra-ui/icons";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import {
  Button,
  CloseButton,
  Flex,
  HStack,
  Heading,
  Input,
  Stack,
  VStack,
  Checkbox,
  useBoolean,
  IconButton,
  Icon,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

import a1Image from "./a3.jpg";
import a4Image from "./a4.jpg";

function Inputs({ onAddItem, onClearItem }) {
  const [title, setTitle] = useState("");

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddItem = () => {
    onAddItem(title);
    setTitle("");
  };

  const clearItem = () => {
    onClearItem();
    setTitle("");
  };
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItem(); 
    }
  };

  return (
    

    <VStack m={10} spacing={10}>
      <Heading as="h2" size="2xl" color="plum">
        To Do List
      </Heading>
      <HStack>
        <Input
          type="text"
          name="title"
          value={title}
          placeholder="할 일을 입력하세요"
          onChange={handleInputChange}
          onKeyDown={handleOnKeyPress}
        />
        <Button onClick={handleAddItem}>등록</Button>
        <Button onClick={clearItem}>리셋</Button>
      </HStack>
    </VStack>
  );
}
function List({ items, itemCheckStates, onSelectItem, onToggleItemCheck, onRefresh}) {
  
  const [editedIndex, setEditedIndex] = useState(-1);
  const [editedText, setEditedText] = useState('');
  // const [listItems, setListItems] = useState([]);
  // console.log(listItems);
  const handleSelectItem = (index) => {
    onSelectItem(index);
  };

  const handleEditInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const submitEditedContent = (index) => {
    if (editedText === '') {
      setEditedIndex(-1);
      return;
    }
    
    const updatedItems = [...items];
    updatedItems[editedIndex] = editedText;
    onRefresh(updatedItems);
    // setListItems(updatedItems);

    setEditedText('');
    setEditedIndex(index);
  };


  return (
    <VStack>
      <VStack w={"70%"}>
        {items.map((item, index) => (
          <Flex align="center" w={"100%"} key={index} textAlign={"left"}>
            <Flex mr={4}>
              <Stack spacing={5} direction="row">
                <Checkbox
                  colorScheme="pink"
                  onChange={() => onToggleItemCheck(index)}
                ></Checkbox>
              </Stack>
            </Flex>
            <Flex
              w={"100%"}
              h={"50px"}
              backgroundColor={"rgba(255, 192, 203, 0.3)"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
            {index === editedIndex ? (
                <Input
                  value={editedText}
                  onChange={handleEditInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      submitEditedContent(index);
                    }
                  }}
                />
              ) : (  
              <Heading
                pl={4}
                as="h4"
                size="md"
                key={index}
                whiteSpace={"pre-wrap"}
                color={"rgb(90, 90, 90)"}
                textDecorationLine={
                  itemCheckStates[index] ? "line-through" : "none"
                }
              >
                {item}
              </Heading>
            )}   
              <HStack>
                
                   {index === editedIndex ? (
                    <IconButton
                      icon={<CheckIcon />}
                      fontSize={"xl"}
                      variant={"unstyled"}
                      onClick={() => {
                        submitEditedContent(editedText);
                      }}
                    />
                  ) : (
                <IconButton
                 icon={<BiEdit />}
                  fontSize={"xl"}
                  variant={"unstyled"}
                  onClick={() => {
                    setEditedText(item);
                    setEditedIndex(index);
                  }}
                />
              )}
                <IconButton
                  icon={<AiOutlineDelete />}
                  fontSize={"xl"}
                  variant={"unstyled"}
                  onClick={() => {
                    handleSelectItem(index);
                  }}
                />
              </HStack>
           </Flex>
          </Flex>
        ))}
      </VStack>
    </VStack>
  );
}

function Todolist() {
  const [listItems, setListItems] = useState([]);
  const [itemCheckStates, setItemCheckStates] = useState([]);
  
  

  const handleAddItemToList = (item) => {
    setListItems([...listItems, item]);
    setItemCheckStates([...itemCheckStates, false]);
  };

  const onClearList = () => {
    setListItems([]);
    setItemCheckStates([]);
  };

  const handleSelectItem = (index) => {
    const updatedItems = listItems.filter((item, idx) => idx !== index);
    const updatedCheckStates = itemCheckStates.filter(
      (_, idx) => idx !== index
    );
    setListItems(updatedItems);
    setItemCheckStates(updatedCheckStates);
  };
  


  
  const handleToggleItemCheck = (index) => {
    const updatedCheckStates = itemCheckStates.map((state, idx) =>
      idx === index ? !state : state
    );
    setItemCheckStates(updatedCheckStates);
  };

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Stack w={"100vw"} h={"100vh"} style={ colorMode === 'light' ? {
      backgroundImage: `url(${a1Image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100vw",
      overflow:"hidden",
    } : {backgroundImage: `url(${a4Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    overflow:"hidden",}}>
      <Stack>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>


      </Stack>
        <Inputs onAddItem={handleAddItemToList} onClearItem={onClearList} />
        <List
          items={listItems}
          itemCheckStates={itemCheckStates}
          onSelectItem={handleSelectItem}
          onToggleItemCheck={handleToggleItemCheck}
          onRefresh={setListItems}
          />
  </Stack> 
  );
}

export default Todolist;