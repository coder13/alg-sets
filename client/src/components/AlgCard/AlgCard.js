import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CopyToClipboard from 'react-copy-to-clipboard';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { algImageUrl, algAnimationUrl } from '../../logic/utils';

const REMOVE_ALG_FROM_ALG_SET_MUTATION = gql`
  mutation RemoveAlgFromAlgSet($id: ID!, $alg: String!) {
    removeAlgFromAlgSet(id: $id, alg: $alg) {
      id
      algs
    }
  }
`;

const AlgCard = ({ alg, algSetId, isOwner }) => {
  const [menuPosition, setMenuPosition] = useState(null);
  const closeMenu = () => setMenuPosition(null);
  return (
    <Fragment>
      <Card>
        <CardActionArea onClick={event => setMenuPosition({ left: event.clientX, top: event.clientY })}>
          <CardMedia component="img" image={algImageUrl(alg)} height={150} />
          <CardContent>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              {alg}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Menu
        open={!!menuPosition}
        onClose={closeMenu}
        anchorPosition={menuPosition}
        anchorReference="anchorPosition"
        transformOrigin={{ vertical: 25, horizontal: 'center' }}
      >
        <CopyToClipboard text={alg}>
          <MenuItem onClick={closeMenu}>Copy</MenuItem>
        </CopyToClipboard>
        <MenuItem
          component="a"
          target="_blank"
          href={algAnimationUrl(alg)}
          onClick={closeMenu}
        >
          Animation
        </MenuItem>
        {isOwner && (
          <Mutation
            mutation={REMOVE_ALG_FROM_ALG_SET_MUTATION}
            variables={{ id: algSetId, alg }}
          >
            {(removeAlgFromAlgSet, { error, loading }) => (
              <ConfirmDialog message="Are you sure you want to delete this alg?" onClose={closeMenu}>
                {confirm => (
                  <MenuItem onClick={confirm(removeAlgFromAlgSet)} disabled={loading}>
                    Delete
                  </MenuItem>
                )}
              </ConfirmDialog>
            )}
          </Mutation>
        )}
      </Menu>
    </Fragment>
  );
};

export default AlgCard;
