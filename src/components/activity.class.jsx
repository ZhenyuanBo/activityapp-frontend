const SetTheme = ({ setColor, setDark }) => {
    const { colors, dark } = useColors()

    React.useEffect(() => {
        setColor(colors); setDark(dark);
        return () => null
    },[])

    return null
}

class Activity extends PureComponent {
    constructor(){
        this.state = {
            colors: { },
            dark: false,
            editActivity: false,
        }
        this.activity = wrapInActivity(this.props.activity);
    }

    formatAMPM(dateActivity) {
        const date = new Date(dateActivity);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return <Text style={styles.ActivityTime}>
            {hours + "." + minutes} <Text style={{...styles.ActivityTime, fontSize: 14}}>{ampm}</Text>
        </Text>
    }

    styles = StyleSheet.create({
        ActivityView: { 
            height: height * 0.25,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 20,
            marginBottom: '5%',
        },
        CircleImage: {
            width: widthToDp('15%'),
            height: widthToDp('15%'),
            borderRadius: 300,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,   
        },
        ImageStyles: {
            width: '100%',
            height: '100%',
            borderRadius: widthToDp('100%') / 2,
            borderWidth: 3,
        },
        ActivityTime: {
            fontSize: 22,
            fontFamily: 'FiraSans-Bold',
            color: colors.text
        },
        TagsView: {
            paddingVertical: 7,
            paddingHorizontal: 12,
            marginBottom: 2,
            marginTop: 2,
            borderRadius: 15,
            borderWidth: 1,
            marginRight: 5,
            borderColor: colors.border
        },
        TagText: {
            color: dark ? colors.text : colors.border,
            fontFamily: 'FiraSans-Bold',
            fontSize: 12
        },
        ActivityDescription: { 
            fontSize: 15,
            color: colors.border,
            fontFamily: 'FiraSans-Medium',
            padding: 10
        },
        TimeTagView: { 
            flexDirection: 'row', 
            borderBottomWidth: 1, 
            borderBottomColor: colors.border
        }
    });

    Box = {
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    }

    setColor = (colors) => {
        this.setState({ colors: colors });
    }

    setDark = (dark) => {
        this.setState({ dark: dark });
    }
    render(){
        return (
            <View style={styles.ActivityView}>
                <SetTheme setColor={this.setColor} setDark={this.setDark} />
                <Swipeable 
                    containerStyle={{ width: '100%', height: '100%', flex: 1, borderRadius: 20 }}
                    childrenContainerStyle={{ flex: 1, backgroundColor: colors.background, borderRadius: 20 }}
                    renderRightActions={() => (
                        <View style={[Box, { backgroundColor: "#FF7676", width: '30%', borderTopRightRadius: 20, borderBottomRightRadius: 20 }]}>
                            <AntDesign
                                color="white"
                                name="delete"
                                size={20}
                            />
                            <Text style={{
                                fontSize: 15,
                                fontFamily: 'FiraSans-Medium',
                                color: "white",
                                marginTop: '5%'
                            }}>Delete</Text>
                        </View>
                    )}
                    onSwipeableRightOpen={() => {this.setState({ editActivity: false })}}
                    useNativeAnimations={true}
                >
                {/* TIME AND TAGS */}
                    <View style={{ flex: 0.6, ...styles.TimeTagView }}>
                    {/* ICON */}
                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.CircleImage}>
                            <Image
                                source={this.props.icon}
                                style={styles.ImageStyles}
                            />
                        </View>
                    </View>
                    {/* TIME | TAGS */}
                    <TouchableOpacity style={{ flex: 0.7, justifyContent: 'center' }} onPress={()=>setEditActivity(!editActivity)}>
                        {editActivity && (
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                backgroundColor: colors.background,
                                shadowColor: colors.text,
                                opacity: 1,
                                shadowOpacity: 1,
                                elevation: 10,
                                shadowOffset: 10,
                                width: '90%',
                                alignSelf: 'center',
                                height: '60%',
                                borderWidth: 0.4,
                                borderColor: colors.text,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Feather name="edit-3" size={20} color={colors.text}/>
                                <Text style={{
                                    fontFamily: 'FiraSans-Bold',
                                    fontSize: 16,
                                    color: colors.text,
                                    marginLeft: '7%'
                                }}>Edit This Activity</Text>
                            </TouchableOpacity>
                        )}
                        {!editActivity && (
                            <>
                                {/* TIME */}
                                <View >
                                    {this.formatAMPM(activity.date)}
                                </View>
                                {/* TAGS */}
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: '-2%', marginTop: '2%' }}>
                                    {this.activity.category.map((cats, index) => {
                                        if (cats.title === props.section) {
                                            return cats
                                            .subCategories
                                            .filter((sub)=>{return sub.selected})
                                            .slice(0, 2)
                                            .map((sub, index) => (
                                                <View style={styles.TagsView} key={index + ""}>
                                                    <Text style={styles.TagText}>{sub.title}</Text>
                                                </View>
                                            ));
                                        }
                                    })}
                                </View>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
                {/* DESCRIPTION */}
                <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={styles.ActivityDescription}
                    >
                        {"<< "}{this.activity.description}{" >>"}
                    </Text>
                </View>
                </Swipeable>
            </View>
        )
    }
}