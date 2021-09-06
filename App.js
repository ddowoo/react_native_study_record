import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, PanResponder, StatusBar } from 'react-native';

// panResponder 학습


const slideToOpen = () => {

  const [open, setOpen] = useState(false)
  const [cuttonHeight, setCuttonHeight] = useState(100)


  const pan = useRef(new Animated.ValueXY())

  const moveCutton = useCallback((_, gesture) => {
    if (gesture.moveY >= 100 && gesture.moveY <= 300) {
      setCuttonHeight(gesture.moveY)
    } else if (gesture.moveY >= 300) {
      setCuttonHeight(300)
    } else {
      setCuttonHeight(100)
    }
  })


  const cuttonPan = useMemo(() => { // useMemo 지금은 있으나 없으나 차이 없음 , 안해도 무관
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        // dx: pan.current.x,
        dy: pan.current.y
      }], {
        listener: moveCutton,   // functional component에서  listner 연결방법  //listner의 변수는 연결시키는곳 위에서 선언되어야 한다. 왜지???
        useNativeDriver: false
        // useNativeDrive 브릿지를 거쳐 실행되는 js관련 코드를 native 로 넘겨 버릴수 있다. 
        // nonlayout관련해서만 적용이 가능하다  (특히 transform에 유용)
        // layout 프로퍼티(width, top, flex 등)에는 적용 불가
      }),

    })
  })


  return (
    <View style={{ flex: 1, backgroundColor: 'white', }}>
      <View
        style={{ width: '100%', height: cuttonHeight, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
      >
        <View style={{ backgroundColor: 'red', height: (cuttonHeight > 200) ? cuttonHeight - 30 : 0, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text >펼쳤을때 내용</Text>
        </View>
        <Animated.View
          style={{ width: '30%', height: 20, backgroundColor: 'lightgray', alignSelf: 'flex-end', position: 'absolute', borderRadius: 15 }}
          {...cuttonPan.panHandlers} // 원하는 뷰에 전개문법을 사용해서 생성했던 PanResponder를 연결 시킬 수 있다.
        />
      </View>
    </View>
  )
};

export default slideToOpen