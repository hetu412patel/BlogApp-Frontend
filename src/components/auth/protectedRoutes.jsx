import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedAdminRoute = (props) => {

  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = () => {

    const userData = JSON.parse(localStorage.getItem("Udata"))
    const token = userData?.token
    const role = userData?.data?.role

    if (!token || role !== "admin") {
      setIsAdmin(false);
      return navigate('/login');
    }
    setIsAdmin(true);
  }

  useEffect(() => {
    checkAdmin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <Fragment>
      {
        isAdmin ? props.children : null
      }
    </Fragment>
  );
}


export const ProtectedLoginRoute = (props) => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);

  const userData = JSON.parse(localStorage.getItem("Udata"))
  const token = userData?.token

  const checkUser = () => {

    if (!token || token === 'undefined') {
      setIsUser(false);
      return navigate('/login');
    }
    setIsUser(true);
  }

  useEffect(() => {
    checkUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

  return (
    <Fragment>
      {
        isUser ? props.children : null
      }
    </Fragment>
  );
}

export const ProtectedLogoutRoute = (props) => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);

  const userData = JSON.parse(localStorage.getItem("Udata"))
  const token = userData?.token

  const checkToken = () => {

    if (token) {
      setIsUser(false);
      return navigate('/');
    }
    setIsUser(true);
  }

  useEffect(() => {
    checkToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

  return (
    <Fragment>
      {
        isUser ? props.children : null
      }
    </Fragment>
  );
}