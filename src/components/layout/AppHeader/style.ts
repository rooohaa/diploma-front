import styled from '@emotion/styled';

export const HeaderWrapper = styled.header`
  padding: 16px 0;
  border: 1px solid #e9ecef;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;

  .app-header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .app-nav ul {
      list-style: none;

      display: flex;
      align-items: center;
      column-gap: 80px;

      .app-nav-link {
        text-decoration: none;

        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        color: #435a7d;

        transition: color 0.3s ease-out;

        &:hover {
          color: ${({ theme }) => `${theme.colors['m-orange'][5]}`};
        }
      }
    }
  }
`;
