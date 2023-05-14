import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";

export default function ModalReportEvent(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const reportEvent = async () => {
     toggleModal();
     props.reportEvent();
  }

  return (
    <View style={{ flex: 1}}>
      <Button  
        style={styles.btnReportEvent} 
        disabled={!props.isActive}
        textColor={'white'} onPress={toggleModal}>
         Denunciar
      </Button>

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <View style={styles.modalBodyContainer}>
            <Text style={styles.text}>
              Confirmar Denuncia
            </Text>

            <View style={styles.btnsRow}>
              <Button mode="outlined" 
                      textColor={'black'} 
                      style={styles.optionsBtn}
                      onPress={toggleModal}>Cancelar
              </Button>
              <Button mode="contained" 
                      buttonColor={'#FF5252'} 
                      textColor={'white'} 
                      style={styles.optionsBtn}
                      onPress={reportEvent}>Confirmar
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
      marginTop: 45
   },
  btnReportEvent: {
    padding: 2,
    marginTop: 15,
    marginBottom: 15,
    width: 140,
    flex:1,
    backgroundColor: '#FF5252'
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
  modalBodyContainer: {
    display: 'flex',
    height: 300, 
    backgroundColor: 'white',
    justifyContent: "space-around",
    padding: 25
  }
})