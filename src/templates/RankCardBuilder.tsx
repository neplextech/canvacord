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
  displayName: string;
  discriminator: string;
  level: number;
  rank: number;
  background: ImageSource;
  variant: RankCardVariant;
  tw: {
    username: string;
    discriminator: string;
    displayName: string;
    level: string;
    rank: string;
    xp: string;
    progress: {
      track: string;
      thumb: string;
    };
    overlay: string;
    percentage: string;
    avatar: string;
    status: string;
  };
  renders: {
    avatar: boolean;
    background: boolean;
    level: boolean;
    rank: boolean;
    status: boolean;
    username: boolean;
    displayName: boolean;
    discriminator: boolean;
    progress: boolean;
    xp: boolean;
    progressbar: boolean;
    constants: {
      rank: string;
      level: string;
      xp: string;
      statusColors: {
        LightGray: string;
        Gray: string;
        DarkGray: string;
        White: string;
        Green: string;
        Yellow: string;
        Red: string;
        Blue: string;
      };
    };
  };
}

const createDefaultCSS = (config: CanvacordRankCardBuilderState) => {
  const colors = {
    LightGray: '#A0A1A3',
    Gray: '#474B4E',
    DarkGray: '#272A2D',
    White: '#FFFFFF',
    Green: '#22A559',
    Yellow: '#F0B332',
    Red: '#F24043',
    Blue: '#8ACDFF'
  };

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

export type RankCardVariant = 'classic' | 'modern';

export class RankCardBuilder extends Builder {
  #data: CanvacordRankCardBuilderState = {
    avatar: null,
    style: null,
    tw: {
      username: '',
      discriminator: '',
      displayName: '',
      level: '',
      rank: '',
      xp: '',
      progress: {
        track: '',
        thumb: ''
      },
      overlay: '',
      percentage: '',
      avatar: '',
      status: ''
    },
    level: 0,
    rank: 0,
    username: '',
    displayName: '',
    discriminator: '',
    currentXP: 0,
    requiredXP: 0,
    status: 'invisible',
    background: '',
    fonts: {
      username: undefined,
      stats: undefined,
      progress: undefined
    },
    variant: 'modern',
    renders: {
      constants: {
        rank: 'RANK',
        level: 'LEVEL',
        xp: 'XP',
        statusColors: {
          LightGray: '#A0A1A3',
          Gray: '#474B4E',
          DarkGray: '#272A2D',
          White: '#FFFFFF',
          Green: '#22A559',
          Yellow: '#F0B332',
          Red: '#F24043',
          Blue: '#8ACDFF'
        }
      },
      avatar: true,
      background: true,
      level: true,
      rank: true,
      status: true,
      username: true,
      discriminator: true,
      progress: true,
      xp: true,
      progressbar: true,
      displayName: true
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

  public setVariant(variant: RankCardVariant) {
    this.#data.variant = variant;
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

  public setDisplayName(name: string) {
    this.#data.displayName = name;
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

  public configureRenderer(config: Partial<CanvacordRankCardBuilderState['renders']>) {
    this.#data.renders = { ...this.#data.renders, ...config };
    return this;
  }

  private async renderClassic() {
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

    const { status, renders } = this.#data;

    const colors = renders.constants.statusColors;

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

  private async renderModern() {
    if (!this.#data.avatar) throw new Error('Avatar is required.');
    if (!FontFactory.size) throw new Error('No fonts are loaded.');

    const avatar = await loadImage(this.#data.avatar);

    let background;
    if (this.#data.background) {
      background = await loadImage(this.#data.background);
    }

    const firstFont = FontFactory.values().next().value as Font;

    this.#data.fonts.username ??= firstFont.name;
    this.#data.fonts.progress ??= firstFont.name;
    this.#data.fonts.stats ??= firstFont.name;

    const fixed = (v: number) => {
      const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
      return formatter.format(v);
    };

    const { currentXP: xp, requiredXP, status, level, rank } = this.#data;
    const username = this.#data.username || this.#data.discriminator;
    const displayName = this.#data.displayName || this.#data.username;

    const percentage = ((xp / requiredXP) * 100).toFixed(0);
    const config = this.#data.renders;
    const tws = this.#data.tw;
    const colors = config.constants.statusColors;

    const statusColor =
      status === 'online'
        ? colors.Green
        : status === 'idle'
        ? colors.Yellow
        : status === 'dnd'
        ? colors.Red
        : colors.Gray;

    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '1.5rem',
          background: background
            ? `url(${background.toDataURL()})`
            : this.#data.style?.root?.backgroundColor ?? '#4FBEFA'
        }}
      >
        <div
          tw={StyleSheet.cn(
            'flex bg-[#2F3136]/80 h-[80%] w-[95%] items-center justify-around rounded-3xl',
            tws.overlay
          )}
        >
          <div tw="flex relative">
            {config.avatar ? (
              <>
                <img
                  src={avatar.toDataURL()}
                  alt="avatar"
                  tw={StyleSheet.cn(
                    `h-[311px] w-[311px] rounded-full mr-8 ${config.status ? 'border-[#272A2D]/80' : ''} border-8`,
                    tws.avatar
                  )}
                />
                {config.status ? (
                  <div
                    tw={StyleSheet.cn(
                      `bg-[${statusColor}] h-16 w-16 rounded-full flex absolute bottom-12 right-5 border-[#272A2D]/80 border-8`,
                      tws.status
                    )}
                  ></div>
                ) : null}
              </>
            ) : null}
          </div>
          <div tw="flex flex-col">
            <div tw="flex items-end justify-between">
              <div tw="flex flex-col">
                {config.displayName && (
                  <h1 tw={StyleSheet.cn(`${username ? '-mb-2' : ''} text-white text-6xl mr-5`, tws.displayName)}>
                    {displayName}
                  </h1>
                )}
                {username && (
                  <h1
                    tw={StyleSheet.cn(
                      !config.displayName ? 'text-white text-6xl' : 'text-[#A7A7A7] text-4xl mb-7',
                      tws.username
                    )}
                  >
                    @{username}
                  </h1>
                )}
              </div>
              {config.progress && <h1 tw={StyleSheet.cn('text-[#A7A7A7] text-4xl', tws.percentage)}>{percentage}%</h1>}
            </div>
            {config.progressbar && (
              <div tw={StyleSheet.cn('flex bg-[#292929]/70 h-[50px] w-[1413px] rounded-full', tws.progress.track)}>
                <div
                  tw={StyleSheet.cn(`flex bg-[#5865F2] h-[50px] w-[${percentage}%] rounded-full`, tws.progress.thumb)}
                ></div>
              </div>
            )}
            <div tw="flex justify-between w-[55%] font-bold">
              {config.level && (
                <h1 tw={StyleSheet.cn('text-4xl', tws.level)}>
                  <span tw="text-[#A7A7A7] mr-2">{config.constants.level}:</span>
                  <span tw="text-white">{level}</span>
                </h1>
              )}
              {config.xp && (
                <h1 tw={StyleSheet.cn('text-4xl', tws.xp)}>
                  <span tw="text-[#A7A7A7] mr-2">{config.constants.xp}:</span>
                  <span tw="text-white">
                    {fixed(xp)}/{fixed(requiredXP)}
                  </span>
                </h1>
              )}
              {config.rank && (
                <h1 tw={StyleSheet.cn('text-4xl', tws.rank)}>
                  <span tw="text-[#A7A7A7] mr-2">{config.constants.rank}:</span>
                  <span tw="text-white">#{rank}</span>
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  public async render() {
    switch (this.#data.variant) {
      case 'modern':
        return this.renderModern();
      default:
        return this.renderClassic();
    }
  }
}
