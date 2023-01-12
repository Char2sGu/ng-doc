import {ClassDeclaration, InterfaceDeclaration, Node} from 'ts-morph';

import {findBaseClass, findClass} from '../class';
import {findInterface} from '../interface';
import {getInterfaceMember} from '../interface/get-interface-member';
import {NgDocClassMember, NgDocInterfaceMember, NgDocMemberType} from './member-type';

export function findMember(node: ClassDeclaration, name: string): NgDocClassMember | undefined;
export function findMember(node: InterfaceDeclaration, name: string): NgDocInterfaceMember | undefined;
/**
 *
 * @param node
 * @param name
 */
export function findMember(node: ClassDeclaration | InterfaceDeclaration, name: string): NgDocMemberType | undefined {
	if (Node.isClassDeclaration(node)) {
		const member: NgDocClassMember | undefined = findClass(
			node,
			(cls: ClassDeclaration) => !!cls.getMember(name),
		)?.getMember(name) as NgDocClassMember;

		return member;
	}

	if (Node.isInterfaceDeclaration(node)) {
		if (Node.isInterfaceDeclaration(node)) {
			const baseInterface: InterfaceDeclaration | undefined = findInterface(
				node,
				(int: InterfaceDeclaration) => !!getInterfaceMember(int, name),
			);

			return baseInterface && getInterfaceMember(baseInterface, name);
		}
	}

	return undefined;
}