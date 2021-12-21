import { Request, Response, NextFunction } from 'express';
import { controllerFunction as cf } from '../controller';


export default {

  list: cf((req, res) => {
    res.json('userlist');
  }),


  show: cf((req, res) => {
    res.json('usershow');
  }),
  
  
  edit: cf((req, res) => {
    res.json('useredit');
  }),
  
  
  create: cf((req, res) => {
    res.json('usercreate');
  }),
  
  
  remove: cf((req, res) => {
    res.json('userremove');
  }),
}