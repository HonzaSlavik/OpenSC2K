import fs from 'fs';
import parsePalette from './parsePalette';
import parseImageDat from './parseImageDat';

let files = {
  LARGE_DAT: fs.readFileSync(__dirname + '/../../assets/import/LARGE.DAT'),
  SMALLMED_DAT: fs.readFileSync(__dirname + '/../../assets/import/SMALLMED.DAT'),
  SPECIAL_DAT: fs.readFileSync(__dirname + '/../../assets/import/SPECIAL.DAT'),
  PAL_MSTR_BMP: fs.readFileSync(__dirname + '/../../assets/import/PAL_MSTR.BMP'),
  TITLESCR_BMP: fs.readFileSync(__dirname + '/../../assets/import/TITLESCR.BMP'),
};

let palette = new parsePalette({
  data: files.PAL_MSTR_BMP
});

let largedat = new parseImageDat({
  palette: palette,
  data: files.LARGE_DAT
});

largedat.createTilemap();