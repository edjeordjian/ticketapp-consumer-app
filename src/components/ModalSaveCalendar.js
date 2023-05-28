import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";


import { FontAwesome5 } from '@expo/vector-icons'

export default function ModalSaveCalendar(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const createEvent = async () => {
     toggleModal();
     props.addToCalendar();
  }

  return (
    <View style={{ flex: 1}}>
        <TouchableOpacity onPress={toggleModal} style={styles.shareBtn}>
          <FontAwesome5 name="calendar" size={22} color="white" />
        </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <View style={styles.modalBodyContainer}>
            <Text style={styles.text}>
            ¿Querés guardar la fecha del evento en tu calendario?
            </Text>

            <View style={styles.btnsRow}>
              <Button mode="outlined" 
                      textColor={'black'} 
                      style={styles.optionsBtn}
                      onPress={toggleModal}>
                    Cancelar
              </Button>
              <Button mode="contained" 
                      buttonColor={'#1A55D7'} 
                      textColor={'white'} 
                      style={styles.optionsBtn}
                      onPress={createEvent}>
                    Agendar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create ({
   container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      color: '#708BA6',
      fontSize: 25,
      textAlign: 'center',
      marginTop: 25
   },
   btnGetEvent: {
      backgroundColor: '#1A55D7',
      width: '90%',
      alignSelf: 'center',
      padding: 2,
      marginTop: 15,
      marginBottom: 15
  },
  btnSoldEvent: {
    backgroundColor: 'grey',
    width: '90%',
    alignSelf: 'center',
    padding: 2,
    marginTop: 15,
    marginBottom: 15
},
  btnsRow: {
   display: 'flex', 
   flexDirection: 'row', 
   padding: 25,
   justifyContent: 'space-around'
  },
  optionsBtn: {
     width: '45%'
  },
  shareBtn: {
    backgroundColor: '#A5C91B', 
    flex:1,
    height: 40, 
    width: 40,
    borderRadius: 20,
    display: 'flex', 
    justifyContent:'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  modalBodyContainer: {
    display: 'flex',
    height: 300, 
    backgroundColor: 'white',
    justifyContent: "space-around",
    padding: 15
  }
})