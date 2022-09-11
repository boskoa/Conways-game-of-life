import { useEffect, useState } from "react";

function trimMatrix(m) {
  const mClone = m.concat();
  let iMin = mClone.length - 1;
  let iMax = 0;
  let jMin = mClone[0].length - 1;
  let jMax = 0;

  for (let i = 0; i < mClone.length; i++) {
    for (let j = 0; j < mClone[0].length; j++) {
      if (mClone[i][j]) {
        if (i < iMin) {
          iMin = i;
        }

        if (j < jMin) {
          jMin = j;
        }

        if (i > iMax) {
          iMax = i;
        }

        if (j > jMax) {
          jMax = j;
        }
      }
    }
  }

  for (let o = 0; o < iMin; o++) {
    mClone.shift();
  }

  for (let n = 0; n < m.length - 1 - iMax; n++) {
    mClone.pop();
  }

  for (let x = 0; x < mClone.length; x++) {
    for (let y = 0; y < jMin - 2; y++) {
      mClone[x].shift();
    }

    for (let z = 0; z < m[0].length - 2 - jMax; z++) {
      mClone[x].pop();
    }
  }

  if (!mClone?.length) {
    return [[0]];
  }
  return mClone;
}

function getGeneration(cells, generations) {
  // Base case
  if (generations < 1) {
    return cells;
  }
  // Find out if there's a chance of growth beyond current space
  function increaseSize(m) {
    if (m[0].includes(1) || m[m.length - 1].includes(1)) {
      return true;
    }
    for (let h = 0; h < m.length; h++) {
      if (m[h][0] === 1 || m[h][m[0].length - 1] === 1) {
        return true;
      }
    }

    return false;
  }
  // Get new array - enlarged if it needs to be
  let newArr = increaseSize(cells)
    ? [...Array(cells.length + 2)].map((a) =>
        Array(cells[0].length + 2).fill(0)
      )
    : cells.concat();

  for (let m = 0; m < cells.length; m++) {
    for (let n = 0; n < cells[0].length; n++) {
      if (increaseSize(cells)) {
        newArr[m + 1][n + 1] = cells[m][n];
      } else {
        newArr[m][n] = cells[m][n];
      }
    }
  }
  // Count neighboring living cells
  function cellNeighbours(x, y, h, l) {
    let nCount = 0;
    if (y - 1 >= 0 && newArr[x][y - 1]) {
      nCount++;
    }
    if (y + 1 < l && newArr[x][y + 1]) {
      nCount++;
    }
    if (x - 1 >= 0 && y - 1 >= 0 && newArr[x - 1][y - 1]) {
      nCount++;
    }
    if (x - 1 >= 0 && newArr[x - 1][y]) {
      nCount++;
    }
    if (x - 1 >= 0 && y + 1 < l && newArr[x - 1][y + 1]) {
      nCount++;
    }
    if (x + 1 < h && y - 1 >= 0 && newArr[x + 1][y - 1]) {
      nCount++;
    }
    if (x + 1 < h && newArr[x + 1][y]) {
      nCount++;
    }
    if (x + 1 < h && y + 1 < l && newArr[x + 1][y + 1]) {
      nCount++;
    }

    return nCount;
  }
  // Initialize empty matrix filled with zeros
  let nextArr = [...Array(newArr.length)].map((a) =>
    Array(newArr[0].length).fill(0)
  );
  // Fill with new values
  for (let i = 0; i < newArr.length; i++) {
    for (let j = 0; j < newArr[i].length; j++) {
      const n = cellNeighbours(i, j, newArr.length, newArr[i].length);
      let cell = newArr[i][j];
      if (n < 2 && cell) {
        nextArr[i][j] = 0;
      } else if (n > 3 && cell) {
        nextArr[i][j] = 0;
      } else if (n === 3 && !cell) {
        nextArr[i][j] = 1;
      } else if ([2, 3].includes(n) && cell) {
        nextArr[i][j] = 1;
      } else {
        nextArr[i][j] = 0;
      }
    }
  }

  return getGeneration(nextArr, generations - 1);
}

const useMatrix = () => {
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(4);
  const [matrix, setMatrix] = useState();
  const [generations, setGenerations] = useState(30);
  const [fields, setFields] = useState([[{}]]);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [life, setLife] = useState(false);
  const [render, setRender] = useState(true);
  const [stopFieldsToMatrix, setStopFieldsToMatrix] = useState(false);

  const matrixToFields = (m) => {
    let id = 0;
    const dimensions =
      1600 / (m.length * m[0].length) > 50
        ? 50
        : 1600 / (m.length * m[0].length);
    return m.map((a) => [
      ...a.map((v) => {
        const color = v ? "success" : "warning";
        const field = {
          id,
          value: v,
          color,
          dimensions,
        };
        id++;
        return field;
      }),
    ]);
  };

  const handleNewValue = (index, value) => {
    const newFields = fields.map((a) => {
      const field = a.find((f) => f.id === index);
      if (field) {
        field.value = value;
        field.color = value === 1 ? "success" : "warning";
        return a.map((f) => (f.id === index ? field : f));
      } else {
        return a;
      }
    });

    return newFields;
  };

  useEffect(() => {
    setMatrix([...Array(height)].map((a) => Array(width).fill(0)));
  }, [height, width, reset]);

  useEffect(() => {
    if (matrix?.length) {
      const startFields = matrixToFields(matrix);
      setFields(startFields);
    }
  }, [matrix]);

  useEffect(() => {
    const fieldsToMatrix = () => {
      const grandArr = [...Array(height)].map((a) => Array(width).fill(0));
      for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
          grandArr[x][y] = fields[x][y].value;
        }
      }

      return grandArr;
    };

    if (start && !stopFieldsToMatrix) {
      const forMatrix = fieldsToMatrix();
      setMatrix(forMatrix);
      setLife((prev) => !prev);
      setStopFieldsToMatrix(true);
    }
  }, [height, width, start, fields, stopFieldsToMatrix]);

  useEffect(() => {
    if (life && generations > 0 && matrix?.flat().includes(1)) {
      setTimeout(() => {
        setMatrix((prev) => {
          const newMatrix = getGeneration(prev, 1);
          return newMatrix;
        });
        setGenerations((prev) => prev - 1);
      }, 1000);
    }
  }, [life, matrix, generations]);

  useEffect(() => {
    if (life) {
      const newFields = [...matrix[0], ...matrix[matrix.length - 1]].includes(1)
        ? matrixToFields(matrix)
        : matrixToFields(trimMatrix(matrix));
      setFields(newFields);
    }
  }, [matrix, life]);

  useEffect(() => {
    if (reset) {
      setWidth(4);
      setHeight(4);
      setMatrix();
      setFields([[{}]]);
      setStart(false);
      setLife(false);
      setGenerations(30);
      setRender(true);
      setReset(false);
      setStopFieldsToMatrix(false);
    }
  }, [reset]);

  return [
    fields,
    setFields,
    start,
    setStart,
    setReset,
    handleNewValue,
    width,
    setWidth,
    height,
    setHeight,
    render,
    setRender,
  ];
};

export default useMatrix;
