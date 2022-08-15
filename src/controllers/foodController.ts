import { Request, Response } from "express";
import * as foodService from '../services/foodService.js';

export async function calculateBasalMetabolicRate(req:Request, res:Response) {
    const {age, height, weight, activityFactor} = req.body;
    res.sendStatus(201)

    // Fórmula para homens: TMB = fator da taxa de atividade x {66 + [(13,7 x Peso(kg)) + ( 5 x Altura(cm)) – (6,8 x Idade(anos))]}

    // Fórmula para mulheres: TMB = fator da taxa de atividade x {655 + [(9,6 x Peso(kg)) + (1,8 x Altura(cm)) – (4,7 x Idade(anos))]}

    // Sedentários (pouco ou nenhum exercício) fator = 1.2
    // Levemente ativo (exercício leve 1 a 3 dias por semana) fator = 1.375
    // Moderadamente ativo (exercício moderado, faz esportes 3 a 5 dias por semana) fator = 1.55
    // Altamente ativo (exercício pesado de 5 a 6 dias por semana) fator = 1.725
    // Extremamente ativo (exercício pesado diariamente e até 2 vezes por dia) fator = 1.9

}