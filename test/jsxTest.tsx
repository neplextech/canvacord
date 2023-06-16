import { JSX, Text, Image, Container, Builder, loadImage, StyleSheet } from '../src/index';

import { writeFileSync } from 'fs';
import { roboto } from './common';

const colors = {
  Gray: '#474B4E',
  DarkGray: '#272A2D',
  White: '#FFFFFF',
  Green: '#22A559',
  Blue: '#8ACDFF'
} as const;

const baseStyle = StyleSheet.create({
  text: {
    color: colors.White,
    fontFamily: roboto.name,
    lineHeight: '10%'
  },
  progress: {
    borderRadius: '20px',
    height: '29px',
    width: '582px'
  }
});

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.Gray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    backgroundColor: colors.DarkGray,
    borderRadius: '10px',
    height: 208,
    width: 809,
    display: 'flex',
    flexDirection: 'column'
  },
  avatar: {
    width: '144px',
    height: '144px',
    borderRadius: '50%',
    border: `6px solid ${colors.Green}`
  },
  username: StyleSheet.compose(
    {
      fontWeight: 'bold',
      fontSize: '36px'
    },
    baseStyle.text
  ),
  progress: StyleSheet.compose(
    {
      fontWeight: 'lighter',
      fontSize: '24px'
    },
    baseStyle.text
  ),
  stats: StyleSheet.compose(
    {
      textTransform: 'uppercase',
      fontSize: '32px',
      fontWeight: 'bold',
      marginRight: '2rem',
      lineHeight: '10%'
    },
    baseStyle.text
  ),
  progressbarTrack: StyleSheet.compose(
    {
      backgroundColor: colors.Gray
    },
    baseStyle.progress
  ),
  progressbarThumb: {
    backgroundColor: colors.Blue,
    width: '53%',
    borderRadius: '20px'
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: '1rem'
  },
  statsSection: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center'
  },
  body: {
    display: 'flex',
    marginLeft: '1rem',
    gap: '1.5rem',
    alignItems: 'center',
    position: 'absolute',
    marginTop: '1.8rem'
  },
  bodyContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '2rem'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  progressContainer: {
    marginTop: '1rem'
  }
});

async function main() {
  const img = new Builder(832, 228);

  img.style = styles.root;

  const avatar = await loadImage('https://cdn.discordapp.com/embed/avatars/0.png?size=256');

  img.addComponent(
    <Container style={styles.overlay}>
      <Container style={styles.statsContainer}>
        <Container style={styles.statsSection}>
          <Text data="Level 1" style={styles.stats} />
          <Text data="Rank 1" style={styles.stats} />
        </Container>
      </Container>
      <Container style={styles.body}>
        <Image src={avatar} style={styles.avatar} />
        <Container style={styles.bodyContent}>
          <Container style={styles.infoContainer}>
            <Container>
              <Text data="Username" style={styles.username} />
            </Container>
            <Container>
              <Text data="124/400" style={styles.stats} />
            </Container>
          </Container>
          <Container style={styles.progressContainer}>
            <Container style={styles.progressbarTrack}>
              <Container style={styles.progressbarThumb}></Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );

  img
    .build({
      debug: false
    })
    .then((data) => {
      writeFileSync(`${__dirname}/jsx/test.png`, data);
    });

  img
    .build({
      format: 'svg'
    })
    .then((data) => {
      writeFileSync(`${__dirname}/jsx/test.svg`, data);
    });
}

main();
