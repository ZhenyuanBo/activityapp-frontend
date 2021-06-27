import React, { useState, useRef, useEffect } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Dimensions, FlatList, SectionList, ActivityIndicator } from 'react-native'
import { CommonStyles } from '../../themes/CommonStyles';
import { ActivitiesStyles } from './activites.styles';
import ScreenHeader from '../../components/header.component';
import Activity from '../../components/activity.component';
import { ActivityEnum } from '../../enums/activity.enum';
import { StatusBar } from 'expo-status-bar';
import PagerView from 'react-native-pager-view';
import { Shades_Class } from '../Shades/shades.function';
import { Service_Activity } from '../../services/activity.service';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';

let XY_ACTIVITY = {};
const { height } = Dimensions.get("screen");
const ActivitiesScreen = (props) => {
    const commonStyles = CommonStyles();
    const styles = ActivitiesStyles();
    const [activePage, settActivePage] = useState(ActivityEnum.All);
    const pageViewer = useRef(null);
    const scrollRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [activities, setActivites] = useState([]);
    const [sectionsData, setSectionsData] = useState([]);
    const isFocused = useIsFocused();

    function filterData(item, index, page) {
        if (page === ActivityEnum.All) return true;
        if (item.types.includes(page)) return true;
        else return false;
    }

    function getActivitiesWithType(Type, Activities) {
        return Activities.filter((Activity, index)=>{
            if (Activity.types.includes(Type)) return true;
            else return false;
        });
    }

    function sectionData(Data) {
        const Types = Service_Activity.getAllActivityTypes();
        const sectionData = [];
        for (let Type of Types) {
            sectionData.push({
                title: Type,
                data: getActivitiesWithType(Type, Data)
            });
        }
        return sectionData;
    }

    async function checkAndLoadActivities(){
        setLoading(true);
        if (!Service_Activity.ACTIVITIES) {
            const response = await Service_Activity.loadActivities();
            if (response.type && response.type === "error") {
                Toast.show(response);
            }
            else {
                setActivites(response);
                setSectionsData(sectionData(response));
            }
        }
        else {
            setSectionsData(sectionData(Service_Activity.ACTIVITIES));
            setActivites(Service_Activity.ACTIVITIES);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (isFocused) checkAndLoadActivities();
    }, [isFocused]);

    return (
        <SafeAreaView style={commonStyles.MainView}>
            <View style={{ height: '18%', justifyContent: 'space-between' }}>
                <StatusBar hidden={true} />
                <ScreenHeader toggleDrawer={props.navigation.toggleDrawer} />
                {/* DATE */}
                <View style={{...commonStyles.PaddedView }}>
                    <Text style={commonStyles.DateDisplay}>{new Date().toDateString()}</Text>
                </View>
                {/* SCREEN NAME */}
                <View style={{...commonStyles.PaddedView, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={commonStyles.ScreenName}>Activities</Text>
                    {loading && (
                        <ActivityIndicator
                            size={commonStyles.ActivityLoader.fontSize}
                            color={commonStyles.ActivityLoader.color}
                            style={{ marginLeft: '3%' }}
                        />
                    )}
                </View>
            </View>
            {/* ACTIVITIES */}
            <View style={{height: '5%', ...commonStyles.PaddedView, justifyContent: 'space-between' }}>
                <FlatList
                    ref={scrollRef}
                    contentContainerStyle={{ alignItems: 'space-between' }}
                    data={Service_Activity.getAllActivityTypes()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index + ""}
                            style={{ ...styles.TypeView, alignItems: 'flex-start' }}
                            onPress={() => {
                                settActivePage(item)
                                pageViewer.current.setPage(index);
                            }}
                            onLayout={()=>{
                                XY_ACTIVITY = Object.assign(XY_ACTIVITY, { 
                                    [item]: index
                                });
                            }}
                        >
                            <Text 
                                style={activePage == item ? styles.TypeViewText : styles.InActiveText}
                            >{item}</Text>
                            {activePage == item && (
                                <View
                                    style={styles.ActiveView(item.length)}
                                ></View>
                            )}
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index + ""}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            {/* SHOW ACTIVITIES */}
            <View style={{flex: 1, ...commonStyles.PaddedView, marginTop: '10%' }}>
                <PagerView
                    ref={pageViewer}
                    initialPage={0}
                    scrollEnabled={true}
                    onPageSelected={(event) => {
                        switch (event.nativeEvent.position) {
                            case 0:
                                if (XY_ACTIVITY[ActivityEnum.All]) scrollRef.current.scrollToIndex({animated: true, index: XY_ACTIVITY[ActivityEnum.All]});
                                settActivePage(ActivityEnum.All);
                                break;
                            case 1:
                                if (XY_ACTIVITY[ActivityEnum.Physiological]) scrollRef.current.scrollToIndex({ animated: true, index: XY_ACTIVITY[ActivityEnum.Physiological]});
                                settActivePage(ActivityEnum.Physiological);
                                break;
                            case 2:
                                if (XY_ACTIVITY[ActivityEnum.Safety]) scrollRef.current.scrollToIndex({ animated: true, index: XY_ACTIVITY[ActivityEnum.Safety]});
                                settActivePage(ActivityEnum.Safety);
                                break;
                            case 3:
                                if (XY_ACTIVITY[ActivityEnum.Love_And_Belong]) scrollRef.current.scrollToIndex({ animated: true, index: XY_ACTIVITY[ActivityEnum.Love_And_Belong]});
                                settActivePage(ActivityEnum.Love_And_Belong);
                                break;
                            case 4:
                                if (XY_ACTIVITY[ActivityEnum.Esteem]) scrollRef.current.scrollToIndex({ animated: true, index: XY_ACTIVITY[ActivityEnum.Esteem]});
                                settActivePage(ActivityEnum.Esteem);
                                break;
                            case 5:
                                if (XY_ACTIVITY[ActivityEnum.Self_Actualization]) scrollRef.current.scrollToIndex({ animated: true, index: XY_ACTIVITY[ActivityEnum.Self_Actualization]});
                                settActivePage(ActivityEnum.Self_Actualization);
                                break;
                        }
                    }}
                    orientation="horizontal"
                    showPageIndicator={false}
                    overScrollMode="never"
                    overdrag={false}
                    style={{ flex: 1, marginTop: '-5%' }}
                >
                    {Service_Activity.getAllActivityTypes().map((page, index) => (
                        <View key={index + 1} showsVerticalScrollIndicator={false}>
                            {page == ActivityEnum.All ? (
                                <SectionList
                                    sections={sectionsData}
                                    keyExtractor={(item, index) => index}
                                    initialNumToRender={3}
                                    renderItem={({ index, item, section }) => (
                                        <Activity
                                            key={index + ""}
                                            activity={item}
                                            section={section.title}
                                            icon={Shades_Class.returnBaseImage(section.title)}
                                        />
                                    )}
                                    renderSectionHeader={({ section: { title, data } }) => (
                                        <View key={title}>
                                            {data.length > 0 && (
                                                <Text
                                                    key={title}
                                                    style={{
                                                        fontFamily: 'FiraSans-SemiBold',
                                                        fontSize: 14,
                                                        marginBottom: '3%',
                                                        marginLeft: '1%',
                                                        color: Shades_Class.returnBaseColor(title)
                                                    }}
                                                >{title.toUpperCase()}</Text>
                                            )}
                                        </View>
                                    )}
                                    showsVerticalScrollIndicator={false}
                                />
                            ) : (
                                <FlatList
                                    data={activities.sort().filter((item, index) => filterData(item, index, page))}
                                    initialNumToRender={3}
                                    renderItem={({ item, index }) => (
                                        <Activity
                                            key={index + ""}
                                            activity={item}
                                            section={page}
                                            icon={Shades_Class.returnBaseImage(page)}
                                        />
                                    )}
                                    keyExtractor={(item, index) => index + ""}
                                    showsVerticalScrollIndicator={false}
                                />
                            )}
                        </View>
                    ))}
                </PagerView>
            </View>
        </SafeAreaView>
    )
}

export default ActivitiesScreen;
