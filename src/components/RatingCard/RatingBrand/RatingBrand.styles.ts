import styled from "styled-components";
import { ProductLogo } from "./ProductLogo";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--brand-gap);
  padding: calc(var(--brand-gap) / 2);
  border-radius: var(--radius-md);
  background: transparent;
  margin-top: 20px;
  margin-bottom: 40px;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: var(--font-scale-2);
  line-height: 1.2;
  white-space: nowrap;
  font-weight: 700;
`;

export const Icon = styled(ProductLogo)`
  display: block;
  height: 1.5rem;
  width: auto;
`;
