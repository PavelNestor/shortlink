import React, { useCallback, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { Loader, LinksList } from '../components';
import { useHttp } from '../hooks';

export const LinksPage = () => {
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const [links, setLinks] = useState(null);

  const fetchLinks = useCallback(() => {
    request('/api/link', 'GET', null, {
      Authorization: `Bearer ${token}`,
    }).then((data) => setLinks(data));
  }, [request, token]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return links && <LinksList links={links} />;
};
