import { Font, FontFactory } from '../assets';
import { CSSPropertiesLike, ImageSource, JSX, loadImage, StyleSheet } from '../helpers';
import { fixed, getDefaultFont } from '../helpers/utils';
import { Builder } from '../templates/Builder';

type StatusType = 'online' | 'idle' | 'dnd' | 'invisible';

interface RankCardBuilderProps {
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

export class RankCardBuilder extends Builder<RankCardBuilderProps> {
  public constructor() {
    super(2000, 512);

    this.bootstrap({
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
      fonts: {},
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
    });
  }

  public setFonts(fontConfig: Required<RankCardBuilderProps['fonts']>) {
    this.options.set('fonts', fontConfig);
    return this;
  }

  public setAvatar(image: ImageSource) {
    this.options.set('avatar', image);
    return this;
  }

  public setBackground(image: ImageSource) {
    this.options.set('background', image);
    return this;
  }

  public setStatus(status: StatusType) {
    this.options.set('status', status);
    return this;
  }

  public setUsername(name: string) {
    this.options.set('username', name);
    return this;
  }

  public setDisplayName(name: string) {
    this.options.set('displayName', name);
    return this;
  }

  public setDiscriminator(discriminator: string) {
    this.options.set('discriminator', discriminator);
    return this;
  }

  public setCurrentXP(xp: number) {
    this.options.set('currentXP', xp);
    return this;
  }

  public setRequiredXP(xp: number) {
    this.options.set('requiredXP', xp);
    return this;
  }

  public setLevel(level: number) {
    this.options.set('level', level);
    return this;
  }

  public setRank(rank: number) {
    this.options.set('rank', rank);
    return this;
  }

  public configureRenderer(config: Partial<RankCardBuilderProps['renders']>) {
    this.options.merge('renders', config);
    return this;
  }

  public async render() {
    const options = this.options.getOptions();

    if (!options.avatar) throw new Error('Avatar is required.');
    if (!FontFactory.size) throw new Error('No fonts are loaded.');

    const avatar = await loadImage(options.avatar);

    let background;
    if (options.background) {
      background = await loadImage(options.background);
    }

    const firstFont = getDefaultFont();

    if (firstFont) {
      options.fonts.username ??= firstFont.name;
      options.fonts.progress ??= firstFont.name;
      options.fonts.stats ??= firstFont.name;
    }

    const { currentXP: xp, requiredXP, status, level, rank } = options;
    const username = options.username || options.discriminator;
    const displayName = options.displayName || options.username;

    const percentage = ((xp / requiredXP) * 100).toFixed(0);
    const config = options.renders;
    const tws = options.tw;
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
          background: background ? `url(${background.toDataURL()})` : options.style?.root?.backgroundColor ?? '#4FBEFA'
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
}
