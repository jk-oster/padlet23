import {AssocArray} from "./assoc-array";

export interface ModalContainer {
  showModal(modal: string): void;
  closeModal(modal: string): void;
  modals: AssocArray;
}
