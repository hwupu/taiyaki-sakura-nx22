import Sakura from './sakura';
import Letter from './letter';
import TaiyakiBody from './taiyaki-body';
import TaiyakiFin from './taiyaki-fin';
import Ring2 from './ring2';
import Ring3 from './ring3';
import Ring4 from './ring4';
import Ring5 from './ring5';
import Ring6 from './ring6';

export default function AnimatedLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 230"
      className="w-[75px] sm:w-[240px] h-[75px] sm:h-[230px]"
    >
      <g>
        <g style={{ transform: 'translate(0px, 92px)' }}>
          <g style={{ transformOrigin: '119px 36px', transform: 'rotate(0deg)' }}>
            <Ring2 />
          </g>
        </g>
        <g style={{ transform: 'translate(-2px, 82px)' }}>
          <g style={{ transformOrigin: '125px 38px', transform: 'rotate(45deg)' }}>
            <Ring3 />
          </g>
        </g>
        <g style={{ transform: 'translate(14px, 82px)' }}>
          <g style={{ transformOrigin: '117px 35.5px', transform: 'rotate(90deg)' }}>
            <Ring4 />
          </g>
        </g>
        <g style={{ transform: 'translate(32px, 87px)' }}>
          <g style={{ transformOrigin: '107px 33px', transform: 'rotate(135deg)' }}>
            <Ring5 />
          </g>
        </g>
        <g style={{ transform: 'translate(50px, 97px)' }}>
          <g style={{ transformOrigin: '95px 29.5px', transform: 'rotate(180deg)' }}>
            <Ring6 />
          </g>
        </g>
      </g>

      <g style={{ transform: 'translate(28px, 48px)' }}>
        <g style={{ transformOrigin: '104px 138px', transform: 'rotate(0deg)' }}>
          <TaiyakiBody />
          <g style={{ transform: 'translate(80px, 75px)' }}>
            <g style={{ transformOrigin: '53px 18px', transform: 'rotate(0deg)' }}>
              <TaiyakiFin />
            </g>
          </g>
        </g>
      </g>

      <g style={{ transform: 'translate(20px, 185px)' }}>
        <g style={{ transformOrigin: '22.5px 21.5px', transform: 'rotate(-20deg)' }}>
          <Sakura />
        </g>
      </g>
      <g style={{ transform: 'translate(187px, 140px)' }}>
        <g style={{ transformOrigin: '22.5px 21.5px', transform: 'rotate(20deg)' }}>
          <Sakura />
        </g>
      </g>
      <g style={{ transform: 'translate(37px, 159px)' }}>
        <Letter />
      </g>
    </svg>
  );
}
