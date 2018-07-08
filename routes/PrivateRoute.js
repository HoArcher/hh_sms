import { Route } from 'react-router-dom';
import Exception from '../src/components/exception'
const defaultRoute=['/dashboard/bookManage','/404'];
export default (args) => {
  const { render, ...rest } = args;
  if (defaultRoute.indexOf(args.location.pathname)!=-1){
    return <Route
    {...rest}
    render={props =>
      <div>
  
        {
          render(props)
        }
      </div>
    }
  />;
  }
  else{
    return <Route
    {...rest}
    render={props =>
      <Exception type='403'/>
    }
  />
  }

}