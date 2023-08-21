import { Font, FontFactory } from '../assets';
import { Container, Image, Text } from '../fabric';
import { CSSPropertiesLike, ImageSource, JSX, loadImage, StyleSheet } from '../helpers';
import { Builder } from './Builder';

type StatusType = 'online' | 'idle' | 'dnd' | 'invisible';

interface CanvacordRankCardBuilderState {
  avatar: ImageSource | null;
  style: CSSPropertiesLike | null;
  fonts: Partial<{
    username: string;
    progress: string;
    stats: string;
  }>;
  status: StatusType;
  currentXP: number;
  requiredXP: number;
  username: string;
  discriminator: string;
  level: number;
  rank: number;
  background: ImageSource;
}

const colors = {
  LightGray: '#A0A1A3',
  Gray: '#474B4E',
  DarkGray: '#272A2D',
  White: '#FFFFFF',
  Green: '#22A559',
  Yellow: '#F0B332',
  Red: '#F24043',
  Blue: '#8ACDFF'
} as const;

const createDefaultCSS = (config: CanvacordRankCardBuilderState) => {
  const baseStyle = StyleSheet.create({
    text: {
      color: colors.White,
      lineHeight: '10%'
    },
    progress: {
      borderRadius: '20px',
      height: '29px',
      width: '591px'
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
      border: '6px solid'
    },
    username: StyleSheet.compose(
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '36px',
        marginBottom: '30px',
        fontFamily: config.fonts.username
      },
      baseStyle.text
    ),
    discriminator: {
      fontSize: '30px',
      color: colors.LightGray,
      marginBottom: '-5px',
      marginLeft: '5px'
    },
    progress: StyleSheet.compose(
      {
        fontWeight: 'lighter',
        fontSize: '24px',
        fontFamily: config.fonts.progress
      },
      baseStyle.text
    ),
    stats: StyleSheet.compose(
      {
        textTransform: 'uppercase',
        fontSize: '32px',
        fontWeight: 'bold',
        marginRight: '2rem',
        lineHeight: '10%',
        fontFamily: config.fonts.stats
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
      width: `${(config.currentXP / config.requiredXP) * 100}%`,
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
      marginTop: '0.3rem'
    }
  });

  return styles;
};

export class RankCardBuilder extends Builder {
  #data: CanvacordRankCardBuilderState = {
    avatar: null,
    style: null,
    level: 0,
    rank: 0,
    username: '',
    discriminator: '',
    currentXP: 0,
    requiredXP: 0,
    status: 'invisible',
    background: '',
    fonts: {
      username: undefined,
      stats: undefined,
      progress: undefined
    }
  };

  public constructor() {
    super(832, 228);
  }

  public get style() {
    return this.#data.style || {};
  }

  public setStyle(style: CSSPropertiesLike) {
    this.#data.style = style;
    return this;
  }

  public setFonts(fontConfig: Required<CanvacordRankCardBuilderState['fonts']>) {
    this.#data.fonts = fontConfig;
    return this;
  }

  public setAvatar(image: ImageSource) {
    this.#data.avatar = image;
    return this;
  }

  public setBackground(image: ImageSource) {
    this.#data.background = image;
    return this;
  }

  public setStatus(status: StatusType) {
    this.#data.status = status;
    return this;
  }

  public setUsername(name: string) {
    this.#data.username = name;
    return this;
  }

  public setDiscriminator(discrim: string) {
    this.#data.discriminator = discrim;
    return this;
  }

  public setCurrentXP(xp: number) {
    this.#data.currentXP = xp;
    return this;
  }

  public setRequiredXP(xp: number) {
    this.#data.requiredXP = xp;
    return this;
  }

  public setLevel(level: number) {
    this.#data.level = level;
    return this;
  }

  public setRank(rank: number) {
    this.#data.rank = rank;
    return this;
  }

  public async render() {
    if (!this.#data.avatar) throw new Error('Avatar is required.');
    if (!FontFactory.size) throw new Error('No fonts are loaded.');

    const firstFont = FontFactory.values().next().value as Font;
    const avatar = await loadImage(this.#data.avatar);

    let background;
    if (this.#data.background) {
      background = await loadImage(this.#data.background);
    }

    this.#data.fonts.username ??= firstFont.name;
    this.#data.fonts.progress ??= firstFont.name;
    this.#data.fonts.stats ??= firstFont.name;

    this.#data.style ??= createDefaultCSS(this.#data);

    const { status } = this.#data;

    const avatarBorderColor =
      status === 'online'
        ? colors.Green
        : status === 'idle'
        ? colors.Yellow
        : status === 'dnd'
        ? colors.Red
        : colors.Gray;

    return (
      <Container
        style={StyleSheet.compose(
          {
            width: `${this.width}px`,
            height: `${this.height}px`
          },
          this.#data.style.root
        )}
      >
        <Container
          style={StyleSheet.compose(this.style.overlay, {
            position: 'relative',
            overflow: 'hidden'
          })}
        >
          {background ? <Image src={background} style={{ position: 'absolute', top: 0, left: 0 }} /> : <></>}
          <Container style={this.style.statsContainer}>
            <Container style={this.style.statsSection}>
              <Text data={`Level ${this.#data.level}`} style={this.style.stats} />

              <Text data={`Rank ${this.#data.rank}`} style={this.style.stats} />
            </Container>
          </Container>

          <Container style={this.style.body}>
            <Image src={avatar} style={{ ...this.style.avatar, borderColor: avatarBorderColor }} />

            <Container style={this.style.bodyContent}>
              <Container style={this.style.infoContainer}>
                <Container>
                  <p style={this.style.username}>
                    <span>{this.#data.username}</span>
                    <span style={this.style.discriminator}>
                      {this.#data.discriminator ? `#${this.#data.discriminator}` : ''}
                    </span>
                  </p>
                </Container>

                <Container>
                  <Text
                    data={`${this.#data.currentXP.toLocaleString()}/${this.#data.requiredXP.toLocaleString()}`}
                    style={this.style.progress}
                  />
                </Container>
              </Container>

              <Container style={this.style.progressContainer}>
                <Container style={this.style.progressbarTrack}>
                  <Container style={this.style.progressbarThumb}></Container>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}
