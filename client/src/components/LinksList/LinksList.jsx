import React from 'react';
import { Link } from 'react-router-dom';

export const LinksList = ({ links }) => {
  return links.length ? (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Original</th>
          <th>Short</th>
          <th>Count</th>
          <th>Details</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          const { _id, from, to, clicks } = link;
          return (
            <tr key={_id}>
              <td>{index + 1}</td>
              <td>{from}</td>
              <td>{to}</td>
              <td>{clicks}</td>
              <td>
                <Link to={`/detail/${_id}`}>
                  Open
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p>No links</p>
  );
};
