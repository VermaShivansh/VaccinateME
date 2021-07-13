import { Switch, Route, Router } from "react-router-dom"
import Registration from "./Registration"
import StaffDetails from "./StaffDetails"
import StaffLogin from "./StaffLogin"
import Track from "./Track"

function MidBody(props) {
  return (
    <div className="midbody d-flex justify-content-center">
      <Switch>
        <Route path="/" exact>
          <Registration />
        </Route>
        <Route path="/track">
          <Track />
        </Route>
        <Route path="/staff" exact>
          {!props.isLoggedIn ? <StaffLogin setisLoggedIn={props.setisLoggedIn} /> : <StaffDetails setisLoggedIn={props.setisLoggedIn} />}
        </Route>
      </Switch>
    </div>
  )
}

export default MidBody
