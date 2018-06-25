import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Icon } from 'native-base';
import { Circle, Rect } from 'react-native-svg';
import styles from './Styles/TransferItemStyles';
import { formatMoney } from '../Transforms';
import { ContentLoader } from './';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const TransferItem = ({ item }) => {
  if (!item) return <TransferLoaderItem />;
  const [date /*, time*/] = item.created_at.split(' ');
  const type = item.transaction_direction === 'out';
  const color = type ? '#e74c3c' : '#218c74';
  const arrow = type ? 'arrow-up' : 'arrow-down';
  const icons = {
    vir_epar: 'swap-horizontal',
    vir_devi: 'swap-horizontal',
    vir_cour: 'swap-horizontal',
    vir_client: 'transfer',
    transf: 'bank',
    micro: 'nfc',
    reject: 'close-box'
  };

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <View style={styles.leftContainer}>
        <MaterialIcon style={styles.typeIcon} size={35} color="#fff" name={icons[item.transaction_type]} />
        <View style={styles.info}>
          <Text style={styles.target}>{item.target}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color }]}>
            {formatMoney(item.amount - item.commission)}
          </Text>
          <Icon style={[styles.icon, { color }]} name={arrow} />
        </View>
        <View style={styles.comissionContainer}>
          <Text style={styles.comission}>{formatMoney(item.commission)}</Text>
          {/* <MaterialIcon style={{ color: 'salmon' }} name="bell" /> */}
          <MaterialIcon size={20} color="salmon" name="ticket-percent" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TransferLoaderItem = () => {
  const { width } = Dimensions.get('window');

  return (
    <View style={[styles.container, styles.loaderContainer]}>
      <ContentLoader
        primaryColor="#95a5a6"
        secondaryColor="#7f8c8d"
        height={50}
        width={width - 20}
        duration={1000}>
        <Rect x="7" y="15" rx="4" ry="4" width="100" height="10" />
        <Rect x={width - 150} y="20" rx="4" ry="4" width="100" height="12" />
        <Circle cx={width - 35} cy="25" r="10" />
        <Rect x="7" y="32" rx="4" ry="4" width="50" height="8" />
      </ContentLoader>
    </View>
  );
};
export { TransferItem, TransferLoaderItem };
