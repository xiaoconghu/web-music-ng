import { MusicModule } from './music.module';

describe('MusicModule', () => {
  let musicModule: MusicModule;

  beforeEach(() => {
    musicModule = new MusicModule();
  });

  it('should create an instance', () => {
    expect(musicModule).toBeTruthy();
  });
});
