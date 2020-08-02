import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {

  const [plans, setPlans] = useState([]);
 // const [setplans, setPlans] = useState([]);
 //const [getplans, getPlans] = useState([]);
 // const [deleteplans, deletePlans] = useState([]);

  useEffect(() => {
    (async () => {
      await getPlans();
    })();
  }, []);

  const getPlans = async () => {
    const plansResp = await Axios.get('/api/plans');
    if (plansResp.status === 200) setPlans(plansResp.data);
  };

  const deletePlan = async plan => {
    try {
      const resp = await Axios.post('/api/plans/delete', {
        id: plan._id
      });

      if (resp.status === 200) toast("The plan was deleted successfully", {type: toast.TYPE.SUCCESS});

      await getPlans();
    } catch (error) {
      toast("There was an error deleting the plan", {type: toast.TYPE.ERROR});
    }
  };

  return (
    <Container className="my-5">
      <header>
        <h1>Archive</h1>
      </header>

      <hr/>

      <div className="content">
        {plans && plans.map((plan, i) => (
          <div key={i} className="card my-3">
            <div className="card-header clearfix">
              <div className="float-left">
                <h5 className="card-title">
                  {plan.title}
                </h5>

                {plan.user ? (
                  <small>~{plan.user.fullname}</small>
                ) : null}
              </div>
                  
              <div className="float-right">
                <small>{plan.updatedAt}</small>
              </div>
            </div>

            <div className="card-body">
              <p className="card-text">
                {plan.synopsis}
              </p>
            </div>

            {user ? (
              <div className="card-footer">
                <Link to={{
                  pathname: "/plans/edit",
                  state: {
                    id: plan._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>

                <button type="button" onClick={() => deletePlan(plan)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Container>
  );

};

export default Index;