import { StyleSheet, View, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import i18n from 'i18n-js';
import moment from 'moment';
import Button from 'react-native-button';

import AppStyle from '../AppStyle';
import Text from './Text';
import Loading from './Loading';

export default function IndefiniteQuarantine({
  startDate,
  size,
  digitStyle,
  digitTxtStyle,
  timeLabels,
  timeLabelStyle,
  onPressFinishQuarantine,
}) {
  const [timer, setTimer] = useState(moment().diff(startDate, 'seconds'));
  const [timerObj, setTimerObj] = useState({
    s: 0,
    m: 0,
    h: 0,
    d: 0,
  });
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useInterval(() => {
    setTimerObj(getFormattedTimerObj());
    setTimer(timer + 1);
  }, 1000);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const getFormattedTimerObj = () => {
    let timeInSeconds = timer;
    // ~~ is shorthand for Math.floor()

    const days = ~~(timeInSeconds / (3600 * 24));
    timeInSeconds -= days * 3600 * 24;
    const hours = ~~(timeInSeconds / 3600);
    timeInSeconds -= hours * 3600;
    const minutes = ~~(timeInSeconds / 60);
    timeInSeconds -= minutes * 60;

    return {
      s: timeInSeconds,
      m: minutes,
      h: hours,
      d: days,
    };
  };

  const renderDigit = (d) => {
    return (
      <View style={[styles.digitCont, { width: size * 2.3, height: size * 2.6 }, digitStyle]}>
        <Text style={[styles.digitTxtStyle, { fontSize: size }, digitTxtStyle]}>{d}</Text>
      </View>
    );
  };

  const renderLabel = (label) => {
    if (label) {
      return <Text style={[styles.timeTxt, { fontSize: size / 1.8 }, timeLabelStyle]} id={label} />;
    }
  };

  const renderCounterContainer = (digits, label) => {
    return (
      <View style={styles.doubleDigitCont}>
        <View style={styles.timeInnerCont}>{renderDigit(digits)}</View>
        {renderLabel(label)}
      </View>
    );
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Text id={'labelQuarantineDuration'} style={AppStyle.header} />
      <View style={styles.timeCont}>
        {renderCounterContainer(timerObj.d, timeLabels.d)}
        {renderCounterContainer(timerObj.h, timeLabels.h)}
        {renderCounterContainer(timerObj.m, timeLabels.m)}
        {renderCounterContainer(timerObj.s, timeLabels.s)}
      </View>
      <Image style={styles.image} source={require('../assets/images/home-cinema.png')} />
      <View style={styles.buttonContainer}>
        <Button style={AppStyle.defaultButton} onPress={onPressFinishQuarantine}>
          {i18n.t('labelFinishMyQuarantine')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  doubleDigitCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeInnerCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitCont: {
    borderRadius: 5,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  digitTxtStyle: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    ...AppStyle.defaultButtonContainer,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
