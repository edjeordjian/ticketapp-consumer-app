import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";

export default function ModalGetEvent(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getEvent = async () => {
     toggleModal();
     props.getEventTicket();
  }

  return (
    <View style={{ flex: 1}}>
      { props.capacity === 0 ?
        <Button style={styles.btnSoldEvent} disabled>
          Entradas agotadas
        </Button>
        :
        <Button style={styles.btnGetEvent} textColor={'white'} onPress={toggleModal}>
         Obtener entrada
      </Button>
      }

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <View style={styles.modalBodyContainer}>
            <Text style={styles.text}>Obtener entrada?</Text>

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
                      onPress={getEvent}>
                Obtener
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
      textAlign: 'center'
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
     width: '40%'
  },
  modalBodyContainer: {
    display: 'flex',
    height: 300, 
    backgroundColor: 'white',
    justifyContent: "space-around",
    padding: 15
  }
})