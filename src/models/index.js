/**
 * Import your models here
 */
import computer from './Computer.glb'
import computerSupport from './ComputerSupport.glb'
import desktop from './Desktop.glb'
import headset from './Headset.glb'
import keyboard from './Keyboard.glb'
import mouse from './Mouse.glb'
import mousePad from './MousePad.glb'
import phone from './Phone.glb'
import phoneSupport from './PhoneSupport.glb'
import rubiksCube from './RubiksCube.glb'
import seat from './Seat.glb'
import screenLeft from './ScreenLeft.glb'
import screenRight from './ScreenRight.glb'
import screenSupport from './ScreenSupport.glb'
import speakers from './Speakers.glb'
import subwooferSpeaker from './SubwooferSpeaker.glb'
import walls from './Walls.glb'
import floor from './Floor.glb'

const modelsList = [
  { name: 'computer', src: computer },
  { name: 'computerSupport', src: computerSupport },
  { name: 'desktop', src: desktop },
  { name: 'headset', src: headset },
  { name: 'keyboard', src: keyboard },
  { name: 'mouse', src: mouse },
  { name: 'mousePad', src: mousePad },
  { name: 'phone', src: phone },
  { name: 'phoneSupport', src: phoneSupport },
  { name: 'rubiksCube', src: rubiksCube },
  { name: 'seat', src: seat },
  { name: 'screenLeft', src: screenLeft },
  { name: 'screenRight', src: screenRight },
  { name: 'screenSupport', src: screenSupport },
  { name: 'speakers', src: speakers },
  { name: 'subwooferSpeaker', src: subwooferSpeaker },
  { name: 'walls', src: walls },
  { name: 'floor', src: floor },
]

/**
 * Export to Loader
 */
export default modelsList
