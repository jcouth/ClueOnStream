import React from 'react';

const InGame = () => {
  const border = '5px solid black';
  const style = { border, borderRadius: '12px' };

  const cards = Array(25).fill(null);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '350px 1fr',
        columnGap: 26,

        paddingTop: 46,
        paddingLeft: 72,
        paddingRight: 72,
        paddingBottom: 20,
      }}
    >
      <aside
        style={{
          display: 'grid',
          gridTemplateRows: '1fr 218px',
          rowGap: 20,
        }}
      >
        <div style={style}></div>
        <div style={style}></div>
      </aside>
      <main
        style={{
          ...style,
          display: 'grid',
          gridTemplateRows: '1fr 60px',
          rowGap: 22,

          padding: 16,

          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(5, 100px)',
            gridTemplateColumns: 'repeat(5, 160px)',
            gap: 10,
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          {cards.map((_, i) => (
            <div
              style={{
                display: 'flex',

                padding: 8,

                borderRadius: 12,
                boxShadow: '0 0 4px black',
                backgroundColor:
                  // i % 3 === 0 ? '#D34F73' : i % 3 === 1 ? '#3F292B' : '#DBBEA1',
                  '#DBBEA1',
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',

                  paddingLeft: 6,
                  paddingRight: 6,
                  paddingBottom: 4,

                  width: '100%',
                  height: '100%',

                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  backgroundColor:
                    // i % 3 === 0
                    //   ? '#D34F73'
                    //   : i % 3 === 1
                    //   ? '#3F292B'
                    //   : '#DBBEA1',
                    '#DBBEA1',
                }}
              >
                {/* <p
                  style={{
                    margin: 0,
                    padding: 0,

                    width: '100%',

                    boxSizing: 'border-box',
                    borderRadius: 12,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  NOME
                </p> */}
              </div>
            </div>
          ))}
        </div>
        <div
          style={
            {
              // backgroundColor: 'red',
            }
          }
        ></div>
      </main>
    </div>
  );
};

export default InGame;
