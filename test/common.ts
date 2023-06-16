import { Font, StyleSheet } from '../src';

export const roboto = Font.fromFileSync(`${__dirname}/Roboto-Regular.ttf`, 'Roboto');
const manrope = Font.fromFileSync(`${__dirname}/Manrope-Regular.ttf`, 'Manrope');

export const styles = StyleSheet.create({
  canva: {
    color: '#AA0000',
    fontSize: '48px',
    fontFamily: roboto.name
  },
  cord: {
    color: '#0F5AE0',
    fontSize: '48px',
    fontFamily: manrope.name
  },
  image: {
    height: '100px',
    width: '100px',
    borderRadius: '50%'
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#2A2D40'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
