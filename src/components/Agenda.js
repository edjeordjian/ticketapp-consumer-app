import { View , StyleSheet} from 'react-native';
import DisplayAgendaCard from './DisplayAgendaCard';

export default function Agenda(props) {
    if (props.agendaEntries) {
        return (
            <View style={styles.eventContainer}>
                {props.agendaEntries.map((e, i) => {
                    return (
                        <DisplayAgendaCard key={e.id} name={e.name} end={e.end} start={e.start}/>
                    );
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    eventContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    }
});