import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks';
import { AuthContext } from '../context/AuthContext';
import { LinkCard, Loader } from '../components';

export const DetailPage = () => {
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const linkId = useParams().id;
  const [link, setLink] = useState(null);

  const getLink = useCallback(async () => {
    request(`/api/link/${linkId}`, 'GET', null, {
      Authorization: `Bearer ${token}`,
    }).then((data) => data && setLink(data));
  }, [linkId, request, token]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return link && <LinkCard link={link} />;
};
